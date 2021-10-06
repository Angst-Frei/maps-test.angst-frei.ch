const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    palette: [
      path.resolve(__dirname, 'src/palette.js'),
    ],
    polylabel: [
      path.resolve(__dirname, 'src/polylabel.js'),
    ],
    main: {
      import: './src/index.js',
      dependOn: 'vendor',
    },
    vendor: ['leaflet', 'jquery', 'papaparse'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin('src/sun.png'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      scriptLoading: 'blocking',
      inject: 'body',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      $               : 'jquery',
      jQuery          : 'jquery',
      Papa            : 'papaparse',
      L               : 'leaflet'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },
      {
        test: /\.(ico|png|jpe?g|gif)$/i,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      '...',
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
};
