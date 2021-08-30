const path = require('path');

module.exports = {
  entry: './src/mainLogic.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development'
};