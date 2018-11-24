// This code creates the Electron App.

// Do not edit anything besides loadFile and dimensions of window.
const {
  app,
  BrowserWindow
} = require("electron");
let loadWindow;

function createWindow() {
  loadWindow = new BrowserWindow({
    width: 450,
    height: 450,
    frame: false,
    icon: __dirname + '/app/src/assets/img/Icon.png'
  });
  loadWindow.loadFile("index.html");
  loadWindow.on("closed", function () {
    loadWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (loadWindow === null) {
    createWindow();
  }
});

exports.openWindow = (filename) => {
  let mainWindow = new BrowserWindow({
    width: 725,
    height: 700,
    show: false,
    icon: __dirname + '/app/src/assets/img/Icon.png'
  })
  //mainWindow.currentOpenWindow().close
  mainWindow.loadFile(filename + '.html')
  mainWindow.maximize();
  mainWindow.show();
}