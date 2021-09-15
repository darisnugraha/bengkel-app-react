const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: "Bengkel App",
        transparent: true,
        width: 900,
        height: 680,
        icon: __dirname + "/favicon.ico",
    });
    mainWindow.loadURL(
        isDev ?
        "http://localhost:3000" :
        "http://localhost:3000"
    );
    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});