const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')
const url = require('url')

const {autoUpdater} = require("electron-updater");
const log = require('electron-log');
const isDev = require('electron-is-dev');


const sendStatusToWindow = (data) => {
  win.webContents.send('message', data)
}

if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
}


let win;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function createWindow () {
  console.log(process.platform + app.getVersion());

  // Create the browser window.
  win = new BrowserWindow({
      width: 800, 
      height: 600,
      icon:path.join(__dirname, 'src/assets/icons/win/icon.ico')
    })

  // and load the index.html of the app.
    //win.loadURL('http://localhost:4200');
     win.loadURL(url.format({      
        pathname: path.join(__dirname, `/dist/index.html`),
       protocol: 'file:',
       slashes: true
     }))
  

//win.loadURL(`file://${__dirname}/src/index.html`);

  // Open the DevTools.
 // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// Create window on electron intialization
// when the app is loaded create a BrowserWindow and check for updates
app.on('ready', function() {
  createWindow()
  autoUpdater.checkForUpdatesAndNotify()

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('version', app.getVersion())
  })

} )

// setInterval(() => {
//   if (!isDev) {
//     log.info("Not a DEV env");
//   autoUpdater.checkForUpdatesAndNotify();  

//   } else {
//     log.info("Its a DEV env");
//   }
// }, 5000)

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
 //autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {

  //win.webContents.send('updateReady')
  //  const dialogOpts = {
  //   type: 'info',
  //   buttons: ['Restart', 'Later'],
  //   title: 'Application Update',
  //    message: process.platform === 'win32' ? releaseNotes : releaseName,
  //    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  //  }

  //  dialog.showMessageBox(dialogOpts, (response) => {
  //   if (response === 0) autoUpdater.quitAndInstall()
  //  })
 //})

   autoUpdater.on('update-downloaded', (info) => {
       sendStatusToWindow('update-downloaded');
   });

// when receiving a quitAndInstall signal, quit and install the new version ;)
 ipcMain.on("quitAndInstall", (event, arg) => {
     autoUpdater.quitAndInstall();
 })

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {  
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  //sendStatusToWindow('Download progress...');
  win.webContents.send('download-progress', progressObj.percent)
})
// autoUpdater.on('update-downloaded', (ev, info) => {
//   sendStatusToWindow('Update downloaded; will install in 5 seconds');
// });



// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})