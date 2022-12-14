/*
Produces production builds and stitches together d.ts files.

To specify the package to build, simply pass its name and the desired build
formats to output (defaults to `buildOptions.formats` specified in that package,
or "esm,cjs"):

```
# name supports fuzzy match. will build all packages with name containing "authentication-web-js-sdk":
yarn build authentication-web-js-sdk

# specify the format to output
yarn build authentication-web-js-sdk  --formats cjs,global
```
*/

const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const args = require('minimist')(process.argv.slice(2))
const { targets: allTargets, fuzzyMatchTarget } = require('./utils')
const { _: targets, formats, version } = args

const sourceMap = true

readyGo()

async function readyGo() {
  if (!targets.length) {
    await buildAll(allTargets)
  } else {
    await buildAll(fuzzyMatchTarget(targets, true))
  }
}

async function buildAll(targets) {
  await runParallel(require('os').cpus().length, targets, build)
}

async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = []
  const executing = []
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source))
    ret.push(p)

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}

async function build (target) {
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  if (pkg.private || !pkg.buildOptions) {
    return
  }
  
  await fs.remove(`${pkgDir}/dist`)

  await execa(
    'rollup',
    [
      '--config',
      'scripts/rollup.config.js',
      '--environment',
      [
        `TARGET:${target}`,
        formats ? `FORMATS:${formats.replace(/,/, '+')}` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``,
        'TYPES:true',
        `VERSION:${version}`
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
  
  if (pkg.types) {
    console.log()
    console.log(
      chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`))
    )

    // build types
    const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

    const extractorConfigPath = path.resolve(pkgDir, `api-extractor.json`)
    const extractorConfig =
      ExtractorConfig.loadFileAndPrepare(extractorConfigPath)
    const extractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    })

    if (extractorResult.succeeded) {
      // concat additional d.ts to rolled-up dts
      const typesDir = path.resolve(pkgDir, 'types')
      if (await fs.exists(typesDir)) {
        const dtsPath = path.resolve(pkgDir, pkg.types)
        const existing = await fs.readFile(dtsPath, 'utf-8')
        const typeFiles = await fs.readdir(typesDir)
        const toAdd = await Promise.all(
          typeFiles.map(file => {
            return fs.readFile(path.resolve(typesDir, file), 'utf-8')
          })
        )
        await fs.writeFile(dtsPath, existing + '\n' + toAdd.join('\n'))
      }
      console.log(
        chalk.bold(chalk.green(`API Extractor completed successfully.`))
      )
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`
      )
      process.exitCode = 1
    }

    await fs.remove(`${pkgDir}/dist/packages`)
    await fs.remove('dist')
    await fs.remove('temp')
  }
}
