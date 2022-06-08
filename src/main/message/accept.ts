import { app, ipcMain } from "electron";

// ipcMain.on 和 ipcMain.once
ipcMain.on("key", (event, args) => {
  if (args === "退出程序") {
    app.quit();
  }
});

// ipcMain.on 和 ipcMain.once
ipcMain.on("compress-data", (event, args) => {
  console.log(args);
});
