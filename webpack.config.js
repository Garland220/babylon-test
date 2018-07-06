'use strict';

const path = require('path');
const BABYLON = require('babylonjs');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'babylonjs': {
      root: 'BABYLON',
      commonjs: 'babylonjs',
      commonjs2: 'babylonjs',
      amd: 'babylonjs'
    }
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/js')
  }
};