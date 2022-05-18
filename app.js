const path = require('path');
const express = require('express');
var fp = require("find-free-port")
const open = require('open');
const fs = require("fs");
const { app, BrowserWindow } = require('electron')
    // create express expressapplication
const expressapp = express();


/*-------------------*/

expressapp.use('/assets', express.static(path.join(__dirname, './assets')));

expressapp.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


/*-------------------*/
// find available port (if not 3000)
fp(3000).then(([freep]) => {
    const port = freep;
    const host = `http://127.0.0.1:${ port }`;
    expressapp.listen(port, async() => {
        console.log(`MarcsQuest Loading...`);
        const createWindow = () => {
            const win = new BrowserWindow({
                width: 1500,
                height: 700,
                resizable: false,

            })
            win.setMenuBarVisibility(false)
            win.loadURL(host)
        }
        app.whenReady().then(() => {
                createWindow()
            })
            //open(`${ host }/`); // opens `web/index.html` page
    });

}).catch((err) => {
    console.error(err);
});