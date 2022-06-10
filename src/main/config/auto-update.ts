import log from "electron-log";
import { autoUpdater } from "electron-updater";

export default async function initAutoUpdate() {
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // ```
  } else {
    // 至于日志位置，就是electron-log本身使用的日志位置了，其路径如下：
    // on Linux:~/.config/{app name}/logs/{process type}.log
    // on macOS:~/Library/Logs/{app name}/{process type}.log
    // on Windows:%USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log

    // 添加更新日志
    log.transports.file.level = "debug";
    autoUpdater.logger = log;

    // 加入此行，开启自动化更新
    await autoUpdater.checkForUpdatesAndNotify();
  }
}
