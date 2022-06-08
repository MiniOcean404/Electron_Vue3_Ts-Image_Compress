import "@/render/css/base.scss";
import "normalize.css";

import "element-plus/dist/index.css";

import "element-plus/theme-chalk/dark/css-vars.css";

import ElementPlus from "element-plus";
import { createApp } from "vue";
import App from "./render/App.vue";
import router from "./render/router";

const app = createApp(App);
app.use(ElementPlus, { size: "default", zIndex: 2000 });
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
app.use(router);
app.mount("#app");
