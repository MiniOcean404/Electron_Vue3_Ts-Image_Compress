import { isDevelopment } from "@/constant/env";
import createWindow from "@/main/index";
import { app, BrowserWindow } from "electron";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

// 当Electron完成时，该方法将被调用
// 初始化并准备创建浏览器窗口。
// 某些api只有在此事件发生后才能使用。
app.whenReady().then(async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      // 报错: ExtensionLoadWarning: Warnings loading extension at xxx
      // 删除 update_url browser_action permission 中 contextMenus
      // 回到上一步中manifest.json的上一层目录，将 xx.crx 改为 xx.rar
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Vue Devtools failed to install:", e.toString());
      }
    }
  }
  await createWindow();
});

// 在macOS上，在应用程序中重新创建一个窗口是常见的
// 单击dock图标，没有打开其他窗口。
app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createWindow();
});

// window 平台窗口关闭时候，
app.on("window-all-closed", () => {
  // 在macOS中，这对于应用程序和它们的菜单栏来说很常见
  // 保持活动，直到用户显式退出Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 在开发模式中，根据父进程的请求干净地退出。
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
