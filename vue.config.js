const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

const isNoOnline = false;

module.exports = defineConfig({
  devServer: {
    port: 3000,
    open: false,
    https: false,
    host: "0.0.0.0",
    // copy:true,
  },

  transpileDependencies: true,
  lintOnSave: false,

  publicPath: "./",
  // 打包是否生成.map文件
  productionSourceMap: false,

  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve("./src"));

    config.resolve.extensions.add(".js").add(".tsx").add(".vue").add("less").add("sass");

    if (isNoOnline) {
      // 打包忽略引入的文件
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        "element-ui": "ELEMENT",
        "vue-quill-editor": "VueQuillEditor",
      });
    }
  },

  css: {
    extract: process.env.NODE_ENV === "production", // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/render/css/var/_var.scss";`,
      },
      css: {
        // 启用 CSS modules ,默认以 .module 结尾的文件为 CSS modules
        // https://cli.vuejs.org/guide/css.html#css-modules
        modules: {
          auto: () => false,
        },
      },
    },
  },

  pages: {
    index: {
      entry: "src/main.ts",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
      cdn: isNoOnline
        ? {
            css: [
              "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
              "https://cdn.bootcdn.net/ajax/libs/wangEditor/3.1.1/wangEditor.min.css",
            ],
            js: [
              "https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js",
              "https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js",
              "https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js",
              "https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js",
              "https://unpkg.com/element-ui/lib/index.js",
              "https://cdn.bootcdn.net/ajax/libs/wangEditor/3.1.1/wangEditor.min.js",
            ],
          }
        : "",
    },
  },

  //  * 由于使用的是Vue CLI Plugin Electron Builder，打包的配置需要放在vue.config.js中,否则使用默认package.json文件中
  pluginOptions: {
    // element plus 按需导入
    AutoImport: AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components: Components({
      resolvers: [ElementPlusResolver()],
    }),

    // https://www.electron.build/
    electronBuilder: {
      // 设置编译后的主文件名,不设置为 main 中的字段会警告
      chainWebpackMainProcess: (config) => {
        config.output.filename("background.js");
      },
      // 是否集成Node
      nodeIntegration: true,
      productName: "图片压缩",
      appId: "com.image-compress.app",
      copyright: "Copyright © 2021 miniOcean404", // 版权
      // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
      compression: "store",
      directories: {
        output: "dist_electron/",
      },
      extraResources: [
        {
          // 打包后拷贝静态文件到指定位置
          from: "./build-assets/**",
          to: "./extraResources/**",
        },
      ],
      extraFiles: [
        {
          // 打包后拷贝文件到指定位置
          from: "./build-assets/**",
          to: "./extraFiles/**",
        },
      ],
      // files: [
      // 	//打包时候包含的包文件
      // 	'**/*'
      // ],
      // 所有平台：7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2, dir（解压目录）。
      builderOptions: {
        win: {
          // ['msi', 'nsis']
          // nsis安装程序、
          // nsis-web（Web 安装程序）、
          // portable（无需安装的便携式应用程序）、
          // AppX（Windows 商店）、
          // Squirrel.Windows
          target: [
            {
              target: "nsis", // 利用nsis制作安装程序,打包文件的后缀为exe
              arch: [
                "x64", // 64位
                "ia32", // 32位
              ],
            },
          ],
          icon: "build-assets/icons/icon.ico",
        },
        nsis: {
          oneClick: false, // 是否一键安装
          language: "2052",
          perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）true 表示此电脑，false代表当前用户
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          installerIcon: "./build-assets/icons/icon.ico", // 安装图标
          uninstallerIcon: "./build-assets/icons/icon.ico", // 卸载图标
          installerHeaderIcon: "./build-assets/icons/icon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "抢购", // 快捷方式名称
          // "guid": "x", //注册表名字，不推荐修改
          // include: 'build/script/installer.nsh', // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
          // script: 'build/script/installer.nsh' // NSIS脚本的路径，用于自定义安装程序。 默认为build / installer.nsi
        },
        // macOS : dmg, pkg, mas, mas-dev.
        mac: {
          target: ["dmg", "zip"],
          category: "public.app-category.utilities",
        },
        dmg: {
          background: "build/背景.jpg",
          icon: "build-assets/icons/icon.icns",
          iconSize: 100,
          artifactName: "ms.dmg",
          contents: [
            {
              x: 380,
              y: 180,
              type: "link",
              path: "/Applications",
            },
            {
              x: 130,
              y: 180,
              type: "file",
            },
          ],
          window: {
            width: 540,
            height: 380,
          },
        },
      },
      // publish: [
      // 	{
      // 		provider: 'github', // 服务器提供商 也可以是GitHub等等
      // 		url: 'http://xxxxx/' // 服务器地址
      // 	}
      // ],
    },
  },
});

// 默认打包方式package.json
// "build": {
//   "productName": "抢购",
//   "appId": "ms",
//   "copyright": "Copyright © 2021 Alaso",
//   "directories": {
//     "buildResources": "build",
//     "output": "dist/"
//   },
//   "files": [  //打包时候包含的包文件
//     "dist/electron",
//     "node_modules/",
//     "package.json"
//   ],
//   "win": {
//     "target": ["msi","nsis"],  //安装包的格式，默认是"nsis" nsis是windows系统安装包的制作程序，它提供了安装、卸载、系统设置等功能 "nsis"打包出来的就是exe文件
//     "icon": "build/icons/favicon.ico" //安装包的图标
//   },
//   "nsis": {
//     "oneClick": false, //是否一键安装，默认为true
//     "language": "2052", //安装语言，2052对应中文
//     "perMachine": true, //为当前系统的所有用户安装该应用程序
//     "allowToChangeInstallationDirectory": true, //允许用户选择安装目录
//     "allowElevation": true,
//     "installerIcon": "./build/icons/favicon.ico",
//     "uninstallerIcon": "./build/icons/favicon.ico",
//     "installerHeaderIcon": "./build/icons/favicon.ico",
//     "createDesktopShortcut": true,
//     "createStartMenuShortcut": true,
//     "shortcutName": "抢购",
//     "include": "build/script/installer.nsh"
//   },
//   "mac": {
//     "target": ["dmg", "zip"], //安装包的格式，默认是"dmg"和"zip"
//     "category": "public.app-category.utilities" //应用程序安装到哪个分类下，具体有哪些分类可以在苹果官网上找
//   },
//   "dmg": {
//     "background": "build/背景.jpg", //安装窗口背景图
//     "icon": "build/icons/icon.icns", //安装图标
//     "iconSize": 100, //图标的尺寸
//     "artifactName": "ms.dmg",
//     "contents": [ //安装图标在安装窗口中的坐标信息
//       {
//         "x": 380,
//         "y": 180,
//         "type": "link",
//         "path": "/Applications"
//       },
//       {
//         "x": 130,
//         "y": 180,
//         "type": "file"
//       }
//     ],
//     "window": {  //安装窗口的大小
//       "width": 540,
//       "height": 380
//     }
//   }
// }
