const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// *** NOTES ***
// - path library is a dependency of webpack; allows us to "resolve file paths" (provide the name of a directory or file to a tool and relying on that tool to find the exact file path)
// - now instead of writing the full file path, we can write things like resolve('file_name')
// - HtmlWebpackPlugin helps us generate an index.html file that the HMR can find

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, "src") + "/index.jsx"
  ],

  // *** NOTES ***
  // - react-hot-loader/patch: activates hot module replacement
  // - webpack-dev-serve/client?http://localhost:8080: connects project to where it will be served
  // - webpack/hot/only-dev-server: instructs webpack to bundle code and then provide that code to the development server
  // - we declare where the bundling process starts, in this case "index.jsx"
  // - index.jsx is now our "entry point"
  // - entry point is the file responsible for instructing the module bundler how to build the application

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  // *** NOTES ***
  // - this tells webpack where to place the bundle file it creates; in this case instructs it to place the bundled code in build/app.bundle.js
  // - path points to a directory called "build" which is where our transpiled and bundled source code will live
  // - __dirname refers to the current directory webpack.config.js is located in
  // - filename determines the name of the file containing our bundled code; standard naming convention for this file
  // - publicPath: specifies where hot-reloaded modules should be loaded


  resolve: {
    extensions: ['.js', '.jsx']
  }

  // *** NOTES ***
  // - tells webpack to locate files with the extensions of .js and .jsx
  // - allows us to omit the file extensions when we are importing files

  devtool: '#source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  }

  // *** NOTES ***
  // devtool: tells webpakc how to communicate errors; #sourcemap tells webpack to reference line numbers from our component files instead of our app.bundle.js file
  // hot: enables HMR on our local server
  // content base: points to the source code it will serve in the browser
  // publicPath: specifies where hot-reloaded modules should be loaded; this must match the publicPath option in output

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["es2015", {"modules": false}],
            "react"
          ],
          plugins: [
            "react-hot-loader/babel"
          ]
        }
      }
    ]
  },

  // *** NOTES ***
  // - tells webpack to use the babel-loader tool to transpile our jsx into ES5, that the jsx files can be found via a .jsx extension, and to ignore .jsx files in the node_modues folder
  // - instructed webpack to use babel as a loader
  // - transformation: the loader will pre-process the code before webpack bundles it
  // - test: indicates which files the loader should transform; this is a regex sorting expression
  // - loader: indicates which loader tool will transform these files
  // - excluded: outlines which files should not be transformed; we don't need to transform our dependencies
  // - options: tells Babel what kind of project we're working with (React) and which version of JavaScript code should be transpiled to (ES5)
  // - {modules:false} turns off CommonJS formatting, which doesn't support hot module replacement

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'React Help Queue',
      filename: resolve(__dirname, "build", "index.html"),
    }),
  ]

  // *** NOTES ***
  // webpack.HotModuleReplacementPlugin: enables HMR globally
  // webpack.NamedModulesPlugin: priunts HMR status updates to the sconsole
  // template: tells the plugin which file to use as a template when creating an index.html in the build directory
  // appMountId: provides the name of our HTML's root DOM node
  // title: sets the <title> tags of our new index.html
  // filename: the location we are placing our programmatically-generated index.html

};
