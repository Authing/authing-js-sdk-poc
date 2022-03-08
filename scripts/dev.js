/*
Run Rollup in watch mode for development.

To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):

```
# name supports fuzzy match. will watch all packages with name containing "authentication-web-js-sdk"
yarn dev authentication-web-js-sdk

# specify the format to output, comma separated multiple parameters are not supported of `--targets`
# the default value of `--formats` is `global` by default
yarn dev authentication-web-js-sdk --formats cjs global

*/

const execa = require('execa')
const { fuzzyMatchTarget, getArgsFromTerminal } = require('./utils')
const { targets, formats } = getArgsFromTerminal()
const target = targets.length && fuzzyMatchTarget(targets) || 'authentication-web-js-sdk'

execa(
  'rollup',
  [
    '-w',
    '--config',
    'scripts/rollup.config.js',
    '--environment',
    [
      `TARGET:${target}`,
      `FORMATS:${formats || 'global'}`,
      'SOURCE_MAP:true'
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
