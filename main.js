// Created on Jan 30 2017 by kundan singh @kundanvishen [github]

/*jshint esversion: 6 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname);

let win = null;

app.on('ready', function() {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({ width: 1000, height: 600 });


    if (process.env.PACKAGE === 'true') {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        win.loadURL(process.env.HOST);
        win.webContents.openDevTools();
    }

    // Remove window once app is closed
    win.on('closed', function() {
        win = null;
    });

});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});