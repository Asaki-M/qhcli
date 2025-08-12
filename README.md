# @qinghuanaa/qhcli

一个快速创建项目的 CLI 工具。:)

## 安装

```bash
npm install -g @qinghuanaa/qhcli
# 或
yarn global add @qinghuanaa/qhcli
# 或
pnpm add -g @qinghuanaa/qhcli
```

## 不全局安装
```bash
npx @qinghuanaa/qhcli create <project-name>
```

## 使用

```bash
# 创建新项目
qhcli create <project-name>

# 示例
qhcli create my-project
```

## 功能特性

- 支持多种项目模板
- 自动规范化项目名称
- 自动初始化 Git 仓库

## 模板列表

- vite-plugin-easy: 一个简单的 Vite 插件模板
- node-ts: 一个简单的 Node Typescript 项目模板
- react-ts: 一个简单的 React + Zustand + React Router + Tailwindcss 项目模板

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 发布新版本
pnpm release
```

## 许可证

MIT
