import browserWindowProp from "@/main/config/browser-window-prop";
import initDevTools from "@/main/config/dev-tools";
import initElectronRemote from "@/main/config/electron-remote";
import { regGlobalShortcut } from "@/main/config/global-shortcut";
import createMenu from "@/main/config/menu";
import initTary from "@/main/config/tary";
import { BrowserWindow } from "electron";

export default async function createWindow() {
  const win: BrowserWindow = new BrowserWindow(browserWindowProp);

  // 设置为最顶层
  // win.setAlwaysOnTop(true)
  // 可以让主进程打开文件或者一个链接;
  // win.loadURL(`www.baidu.com`)

  await initElectronRemote(win);
  await initDevTools(win);
  initTary(win);
  createMenu(win);
  regGlobalShortcut(win);
}
