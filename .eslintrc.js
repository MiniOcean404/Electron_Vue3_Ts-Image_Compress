module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "prettier", // eslint-config-prettier插件:关闭所有不必要或可能与Prettier冲突的规则
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".vue", ".ts"],
      },
      // alias: {
      //   map: [["@", "./src"]],
      //   extensions: [".vue", ".ts"], // ***2.解决引入问题
      // },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { packageDir: "./" }],
    "no-console": "off",
  },
};
