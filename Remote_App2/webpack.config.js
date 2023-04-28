const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require("./package.json").dependencies;

module.exports = {
  entry: './src/bootstrap.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',

  devServer: {
    static: path.join(__dirname,'dist'),
    port: 3002
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](lodash|d3|delaunator|internmap|robust-predicates)/,
          name: 'Vendors_Lodash_D3',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Remote app',
      template: path.resolve(__dirname, './src/template.html')
    }),

    new ModuleFederationPlugin({
      name: 'remoteApp2_oneVendorsBundle',
      library: {
        type: 'var',
        name: 'remoteApp2_oneVendorsBundle'
      },
      filename: 'remoteEntry.js',
      exposes: {
        './mySharedFunction': './src/sharedModules/mySharedFunction.js',
        './mySharedButton': './src/sharedModules/mySharedButton.js'
      },
      shared: {
        lodash: {
          singleton: true,
          eager: false,
          requiredVersion: deps["lodash"],
        },
        d3: {
          singleton: true,
          eager: false,
          requiredVersion: deps["d3"],
        },
      },
    })
  ]
};