const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = [{
  entry: "./build/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "dropdown.js",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
    ],
  },
}, {
  entry: "./build/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "dropdown.min.js",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
}]
