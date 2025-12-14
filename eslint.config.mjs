import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
    {
        // 添加自定义规则配置
        rules: {
            "react/react-in-jsx-scope": "off", // 禁用 React 17+ 的 JSX 转换要求
            "react/jsx-uses-react": "off",     // 同样禁用这个相关规则
        }
    },
    {
        files: [
            "next.config.ts",
            "next.config.mjs",
            "*.config.js"
        ],
        rules: {
            "@typescript-eslint/no-require-imports": "off"
        }
    }
];