import { app, BrowserWindow, screen, Rectangle, BrowserWindowConstructorOptions } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Creates an Electron.BrowserWindow and manages restoring it to its precious position
 * @param {string} name - Name of the browser window you're creating
 * @param {BrowserWindowConstructorOptions} options - An object definging the default height and width of a BrowserWindow
 */
export default (name: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const USER_DATA_DIR = app.getPath("userData");
  const stateStoreFile = `window-state-${name}.json`;
  const defaultSize = {
    width: options.width,
    height: options.height
  }

  let state: Rectangle;
  let win: BrowserWindow;

  const restore = (): Rectangle => {
    let restoredState: Rectangle
    try {
      const fileContent: string = readFileSync(join(USER_DATA_DIR, stateStoreFile), "utf8")
      restoredState = JSON.parse(fileContent)
    } catch (err) {
      console.log(err)
    }
    return <Rectangle>Object.assign({}, defaultSize, restoredState)
  }

  const getCurrentPosition = (): Rectangle => {
    const position = win.getPosition();
    const size = win.getSize();
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    };
  };

  const windowWithinBounds = (windowState: Rectangle, bounds: Rectangle): boolean => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Rectangle) => {
    const visible = screen.getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds);
    });
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults();
    }
    return windowState;
  };

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    try {
      writeFileSync(join(USER_DATA_DIR, stateStoreFile), JSON.stringify(state), "utf8")
    } catch (error) {
      throw error
    }
  };

  state = ensureVisibleOnSomeDisplay(restore());

  win = new BrowserWindow(Object.assign({}, options, state));

  win.on("close", saveState);

  return win;
};


