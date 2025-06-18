// login-mf/craco.config.js
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.publicPath = 'auto';

      if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
      }

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'login_mf',
          filename: 'remoteEntry.js',
          exposes: {
            './LoginApp': './src/index.js',
          },
          shared: {
            ...require('./package.json').dependencies,
            react: {
              singleton: true,
              requiredVersion: '^18.2.0',
              eager: true,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: '^18.2.0',
              eager: true,
            },
            'single-spa': { // Crucial: Single-SPA must be shared and singleton!
                singleton: true,
                requiredVersion: '^6.0.0',
                eager: true,
            }
          },
        })
      );

      return webpackConfig;
    },
  },
  devServer: {
    port: 8082, // Unique port for Login MF
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    static: {
        directory: path.join(__dirname, 'build'),
        publicPath: '/',
    }
  },
};