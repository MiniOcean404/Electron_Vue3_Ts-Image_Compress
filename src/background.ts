import "@/main/life-cycle/index";
// 线程消息渠道监听必须在 主文件 引入 否则监听失效
import "@/main/message";
import { protocol } from "electron";

// 方案必须在应用程序准备之前注册
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);
