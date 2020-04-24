const commonjs = require('rollup-plugin-commonjs');

module.exports = {
    input: 'client/boot.js',
    output: {
      file: 'public/js/bundle.js',
      format: 'iife',
      name: 'app',
    },
    plugins: [
      commonjs()
    ],
    treeshake: false
  };