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
        },
        {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=application/octet-stream"
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        },
        {
            test: /\.gif$/,
            loader: "url-loader?mimetype=image/png"
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&minetype=image/svg+xml"
        }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        _ : 'lodash',
        React : 'react'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
  ],
};
