const {app, BrowserWindow, ipcMain} = require('electron');

module.exports = class TimelineWindow {
  constructor() {
    this.window = null;
    this.newMentionsCount = 0;
    this.start();
  }

  start() {
    app.on('ready', () => {
      this.createWindow();
      ipcMain.on('newMention', () => {
        if (this.window.isFocused()) {
          return;
        }

        this.newMentionsCount++;
        this.updateBadge();
      })
    });
  }

  createWindow() {
    this.window = new BrowserWindow({
      x: 0,
      y: 0,
      width: 650,
      height: 1000
    });

    this.window.on('focus', () => {
      this.newMentionsCount = 0;
      this.updateBadge();
    });

    this.window.loadURL(`file://${__dirname}/../../html/main.html`);
  }

  updateBadge() {
    app.setBadgeCount(this.newMentionsCount);
  }
}


