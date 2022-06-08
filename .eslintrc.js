module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 表示你想使用的额外的语言特性
  parserOptions: {
    ecmaVersion: 12, // 'latest' | 11 | 2020  (不自动启用es6全局变量) es6是es2015
    sourceType: "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    ecmaFeatures: {
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // 启用全局 strict mode
      jsx: false, // 启用 JSX
    },
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
    },
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { packageDir: "./" }],
    "no-console": "off",

    "no-param-reassign": "off",
    // 禁止某些 Vue 规则
    "vuejs-accessibility/click-events-have-key-events": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
