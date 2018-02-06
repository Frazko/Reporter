import { isDev } from './../shared/isDev';
import { envirmoments } from "../../config/env";
import { BrowserWindow, app, } from "electron";
import { join } from 'path'
import { format } from "url";
import { enableLiveReload } from './helpers/renderer-reload';
import createWindow from './helpers/window'

const ENV = isDev() ? envirmoments.development : envirmoments.production;

let mainWindow: BrowserWindow;

if (ENV.name === "development") {
  const userDataPath = app.getPath("userData")
  app.setPath("userData", `${userDataPath} (${ENV.name})`)
}

function createMainWindow() {
  mainWindow = createWindow("main", {
    width: 800,
    height: 600,
    show: false,
  })
  const index = join(__dirname, '/../../dist/renderer/index.html')

  mainWindow.loadURL(format({
    pathname: index,
    protocol: 'file',
    slashes: true
  }))
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    // dereference the window object
    mainWindow = null;
  })
  if (ENV.name === "development") {
    enableLiveReload(mainWindow)
  }
}

app.on('ready', () => {
  if (ENV.name === "development"){
    console.log(`User data directory: ${app.getPath('userData')}`)
  }
  createMainWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

