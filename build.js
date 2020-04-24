const exec = require('child_process').execSync

function run(cmd, opts = {}) {
    opts.stdio = ["inherit", "inherit", "inherit"]
    exec(cmd, opts)
}

const { LANGUAGES, skipBuild } = require("./client/languages")
const languages = Object.keys(LANGUAGES).filter((l) => !skipBuild.includes(l))

run(`node ./tools/build.js -t browser ${languages.join(" ")}`, {cwd: "./work/highlight.js"})
run(`cp work/highlight.js/build/highlight.min.js public/js/highlight.js`)
run("./node_modules/.bin/rollup -c")
run("gzip -f -k public/js/highlight.js")
run("brotli -f -k public/js/highlight.js")
run("gzip -f -k public/js/bundle.js")
run("brotli -f -k public/js/bundle.js")
