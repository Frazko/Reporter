const webpack = require('webpack')
const config = require('./webpack.electron')
const childProcess = require('child_process')
const electron = require('electron')
const args = require('yargs-parser')(process.argv.slice(2))

const env = "development"
const compiler = webpack(config(env))
let alreadyRunning = false;


const mainWatcher = compiler.watch({}, (err, stats) => {
  if (!err && !stats.hasErrors() && !alreadyRunning) {
    alreadyRunning = true;
    console.log("Watching Main process source files")

    //DOES NOT WORK HOW I WANT AT THE MOMENT
    // starts compiling and watching angular source
    //const rendererWatcher = childProcess
    //  .exec("npm run build:ng:dev", { cwd:"." })
    //  .on("exit", () => {
    //    console.log("Stopped watching Renderer Process source files")
    //  })
    //process.on('exit', (code) => {
    //  rendererWatcher.kill()
    //})

    if (args.c) {
      childProcess
        .spawn(electron, [
          ".", "--inspect=9229", "--remote-debugging-port=9223"],
        { stdio: "inherit" })
        .on("close", () => {
          mainWatcher.close()
          rendererWatcher.kill()
        })
    }
  }
})