const fs = require('fs')
const path = require('path')

class TsconfigPlugin {
  constructor() {
    this.basePath = '.'
  }

  genResolveAlias(compiler) {
    const _paths = {}
    for (const [path, dist] of Object.entries(compiler.options.resolve.alias)) {
      if (path === 'react-native') continue

      const _dist = dist.substr(this.basePath.length + 1) // +1 for don't start with '/'
      _paths[`${path}/*`] = [`${_dist}/*`]
    }
    return _paths
  }

  async apply(compiler) {
    const jsonFilePath = path.join(__dirname, '..', 'tsconfig-extends.json')
    // const config = await fs.readFileSync(jsonFile, 'utf8')
    const baseConfig = `
    {
      "compilerOptions": {
        "baseUrl": "."
      },
      "exclude": [
        "src/**/*.stories.*",
        "src/**/Stories/*",
        "**/*.spec.ts"
      ]
    }
    `
    const parsed = JSON.parse(baseConfig)

    this.basePath = path.join(__dirname, '..', parsed.compilerOptions.baseUrl)
    const paths = this.genResolveAlias(compiler)
    parsed.compilerOptions.paths = paths
    parsed.exclude = [...parsed.exclude]

    await fs.writeFileSync(jsonFilePath, JSON.stringify(parsed, null, 2))
  }
}

module.exports = TsconfigPlugin
