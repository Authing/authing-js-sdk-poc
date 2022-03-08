// yarn generate xxx

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const args = require('minimist')(process.argv.slice(2))
const { _ } = args
const packageName = _[0]
const packageVersion = require('../lerna.json').version

readyGo()

function readyGo () {
  const packagesDir = path.resolve(__dirname, '../packages')
  const files = fs.readdirSync(packagesDir)

  if (files.indexOf(packageName) > -1) {
    return console.log(
      chalk.bold(chalk.red(`Package "${packageName}" has existed...`))
    )
  }

  generatePackageDir()
  generateSrcDir()
  generatePkg()
  generateApiExtractor()
  generateREADME()
  generateTestDir()
}

function generatePackageDir () {
  fs.mkdirSync(`packages/${packageName}`)
}

function generateSrcDir () {
  fs.mkdirSync(`packages/${packageName}/src`)
}

function generatePkg () {
  const packageData = {
    "name": `@authing/${packageName}`,
    "version": packageVersion,
    "description": "----------- Please enter the package description -----------",
    "main": `dist/${packageName}.cjs.js`,
    "module": `dist/${packageName}.esm-bundler.js`,
    "types": `dist/${packageName}.d.ts`,
    "files": [
      "dist",
      "src"
    ],
    "buildOptions": {
      "name": "AuthingAuthenticationSDK",
      "formats": [
        "esm-bundler",
        "esm-browser",
        "cjs",
        "global",
        "amd",
        "umd"
      ]
    },
    "keywords": [
      packageName
    ],
    "miniprogram": packageName,
    "author": "https://github.com/authing",
    "license": "MIT",
    "publishConfig": {
      "access": "public",
      "registry": "https://registry.npmjs.org"
    },
    "repository": {
      "type": "git",
      "url": "https://github.com/authing/authing-js-sdk"
    },
    "bugs": {
      "url": "https://github.com/authing/authing-js-sdk/issues"
    }
  }  
  fs.writeFileSync(`packages/${packageName}/package.json`, JSON.stringify(packageData, null, 2), 'utf-8')
}

function generateApiExtractor () {
  const apiExtractor = {
    "extends": "../../api-extractor.json",
    "mainEntryPointFilePath": "./dist/packages/<unscopedPackageName>/src/index.d.ts",
    "dtsRollup": {
      "publicTrimmedFilePath": "./dist/<unscopedPackageName>.d.ts"
    }
  }
  fs.writeFileSync(`packages/${packageName}/api-extractor.json`, JSON.stringify(apiExtractor, null, 2), 'utf-8')
}

function generateREADME () {
  fs.writeFileSync(
    `packages/${packageName}/README.md`, 
    `# @authing/${packageName}`, 
    'utf-8'
  )
}

function generateTestDir () {
  fs.mkdirSync(`packages/${packageName}/__tests__`)
}
