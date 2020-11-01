const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 450,
    icon: "src/img/icon.png",
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.setResizable(false);
  win.removeMenu();
  win.loadFile('src/index.html');
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
