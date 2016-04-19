module.exports = {
  entry: "./build/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "dropdown.min.js",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015"],
        },
      },
    ],
  },
}
