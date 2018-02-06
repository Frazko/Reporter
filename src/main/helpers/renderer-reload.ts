import { isDev } from './../../shared/isDev';
import { BrowserWindow } from 'electron';
import { watch } from "chokidar";
import { join } from 'path';

const regexp = /(^|[\/\\])\..|(^node_modules)|(package)[\-\..]|(^tsconfig)./;

export const enableLiveReload = (win: BrowserWindow) => {
  const watchDir = join(__dirname, "/../../renderer/")
  const watcher = watch(watchDir, {
    ignored: regexp
  })

  watcher.on('ready', () => {
    watcher.on('change', (path: string) => {
      console.log(`Changes detected in ${path}`)
      win.webContents.reloadIgnoringCache()
    })
  })
}