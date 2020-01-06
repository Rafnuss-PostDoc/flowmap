// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file

const webpack = require('webpack');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  
  entry: './src/app.js',
  
  output: { 
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  devServer: {
    //contentBase: './',//path.join(__dirname, 'dist'),
    //compress: true,
    port: 8006
  },
  
  //plugins: [new HtmlWebpackPlugin({title: 'Test example'})],
  
  module: {
    rules: [
      {
        // Transpile ES6 to ES5 with babel
        // Remove if your app does not use JSX or you don't need to support old browsers
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  
  // Optional: Enables reading mapbox token from environment variable
  /*plugins: [
    new webpack.EnvironmentPlugin(['MapboxAccessToken']),
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
  ]*/
  
};

// This line enables bundling against src in this repo rather than installed module
//module.exports = env => (env ? require('../../webpack.config.local')(CONFIG)(env) : CONFIG);