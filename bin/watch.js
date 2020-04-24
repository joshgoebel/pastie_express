var nodemon = require('nodemon');

nodemon({
  script: 'app.js',
  ext: 'js json',
  verbose: true,
  stdout: true
});



const rollupConfig = require("../rollup.config.js")
const rollup = require('rollup');
const watcher = rollup.watch(rollupConfig);

watcher.on('event', event => {
    if (event.code==="ERROR") {
        console.log(event)
    }
    // console.log(event)
  // event.code can be one of:
  //   START        — the watcher is (re)starting
  //   BUNDLE_START — building an individual bundle
  //   BUNDLE_END   — finished building a bundle
  //   END          — finished building all bundles
  //   ERROR        — encountered an error while bundling
  //   FATAL        — encountered an unrecoverable error
});

// stop watching
// watcher.close();


// nodemon.stderr = function(x) { console.log(x) }

nodemon.on('start', function () {
    // this.stderr.pipe(this.stdin);
//   console.log('App has started');
}).on('stdout', function (data) {
    console.log(data.toString())
}).on('stderr', function (data) {
    console.error(data.toString())
}).on('quit', function () {
//   console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});

//



