import { isOpenOrCloseDevtools } from "@/main/utils/devtool";
import { BrowserWindow, Menu } from "electron";

let win: BrowserWindow;

const template = [
  {
    label: "开发者",
    submenu: [
      {
        label: "打开开发者工具",
        click: () => {
          const { webContents } = win;
          isOpenOrCloseDevtools(webContents);
        },
        // 添加快捷键
        accelerator: "ctrl + shift + i",
      },
    ],
  },
];

export default function createMenu(windows: BrowserWindow) {
  win = windows;

  // 从模板中创建菜单
  const myMenu = Menu.buildFromTemplate(template);

  // 设置为应用程序菜单
  Menu.setApplicationMenu(myMenu);
}
