const OfflinePlugin = require('offline-plugin');
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
    path: Path.join(__dirname, 'public'),
    publicPath: '/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new OfflinePlugin({
      appShell: '/',
      autoUpdate: true,
      externals: [
        '/',
        '/index.html',
        '/manifest.json',
        '/images/android-icon-36x36.png',
        '/images/android-icon-48x48.png',
        '/images/android-icon-72x72.png',
        '/images/android-icon-96x96.png',
        '/images/android-icon-144x144.png',
        '/images/android-icon-192x192.png',
        '/images/android-icon-192x192.png',
        '/images/apple-icon.png',
        '/images/apple-icon-57x57.png',
        '/images/apple-icon-72x72.png',
        '/images/apple-icon-76x76.png',
        '/images/apple-icon-114x114.png',
        '/images/apple-icon-120x120.png',
        '/images/apple-icon-144x144.png',
        '/images/apple-icon-152x152.png',
        '/images/apple-icon-180x180.png',
        '/images/apple-icon-precomposed.png',
        '/images/favicon.ico',
        '/images/favicon-16x16.png',
        '/images/favicon-32x32.png',
        '/images/favicon-32x32.png',
        '/images/favicon-96x96.png',
      ],
      caches: {
        main: [
          'bundle.electron.js'
        ],
        additional: [
          ':externals:'
        ],
      },
      publicPath: '/',
      responseStrategy: 'network-first',
      safeToUseOptionalCaches: true,
      AppCache: {
        events: true
      },
      ServiceWorker: {
        cacheName: 'e-osvc',
        entry: './src/serviceWorker.js',
        events: true,
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
  target: 'electron-renderer',
});
