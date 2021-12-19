/* leny/triton
 *
 * /src/electron.js
 */

const {app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        heigth: 1000,
        webPreferences: {
            webSecurity: false,
        },
    });

    if (isDev) {
        mainWindow.loadURL("http://localhost:1234");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile("./bin/app.html");
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

isDev &&
    app.on(
        "certificate-error",
        (event, webContents, url, error, certificate, callback) =>
            callback(true),
    );
