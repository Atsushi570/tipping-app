const path = require('path')
const rootPath = path.resolve(__dirname, '../src')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = async ({ config }) => {
  mode = 'development'

  config.resolve.extensions = ['.js', '.vue', '.json']
  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/assets/scss/_variables.scss'),
            path.resolve(__dirname, '../src/assets/scss/_inheritances.scss'),
            path.resolve(__dirname, '../src/assets/scss/_mixin.scss'),
            path.resolve(__dirname, '../src/assets/scss/common.scss'),
            path.resolve(__dirname, '../src/assets/scss/basics/align.scss'),
            path.resolve(__dirname, '../src/assets/scss/basics/color.scss'),
            path.resolve(__dirname, '../src/assets/scss/basics/font-size.scss'),
            path.resolve(__dirname, '../src/assets/scss/basics/rounded.scss'),
            path.resolve(__dirname, '../src/assets/scss/basics/size.scss')
          ]
        }
      }
    ]
  })

  config.plugins.push(new MiniCssExtractPlugin({}))
  return config
}
