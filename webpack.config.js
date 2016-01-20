import webpack from 'webpack';

export default {
  cache: true,
  entry: "./app/main.jsx",
  output: {
    path: __dirname + "/server/public",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['react', 'es2015']
            }
        }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  ],
};
