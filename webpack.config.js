const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const mode = process.env.MODE

module.exports = {
  mode,
  entry: './src/scripts/index.js',
  output: {
    filename: './scripts/[name].js',
    path: `${__dirname}/public/`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: (mode === 'development')
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin(
      `./styles/style.css`
    ),
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      // hash: true
    })
  ],
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 5060,
    open: false
  }
};
