const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",

  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Host app",
      template: path.resolve(__dirname, "./src/template.html"),
    }),

    new ModuleFederationPlugin({
      name: "hostApp_oneVendorsBundle",
      library: {
        type: "var",
        name: "hostApp_oneVendorsBundle",
      },
      remotes: {
        remoteApp: "remoteApp_oneVendorsBundle", // @http://localhost:3000/remoteEntry.js
        remoteApp2: "remoteApp2_oneVendorsBundle", // @http://localhost:3002/remoteEntry.js
      },
      shared: ['lodash', 'd3']
    }),
  ],
};
