const path = require('path');
const { app } = require('electron');
const fs = require('fs-extra');
const appName = app.getName();

// Get app directory
// on OSX it's /Users/Yourname/Library/Application Support/AppName
const getAppPath = path.join(app.getPath('appData'), appName);

fs.unlink(getAppPath, () => {
  // callback
  alert("App data cleared");
  // You should relaunch the app after clearing the app settings.
  app.relaunch();
  app.exit();
});