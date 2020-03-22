const Path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = () => ({
  entry: {
    bundle: [
      Path.join(__dirname, 'src/index.electron.js'),
    ],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        include: Path.join(__dirname, 'src'),
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:8]'
              },
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          { loader: 'file-loader?name=./fonts/[name].[ext]' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              titleProp: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].electron.js',
    path: Path.join(__dirname, 'public/generated'),
    publicPath: '/generated/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
  target: 'electron-renderer',
});
