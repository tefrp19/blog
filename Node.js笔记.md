# 简介

## 运行环境（runtime environment）

> **运行环境**（英语：Runtime environment，又称“**运行期系统**”，run-time system），指一种把半编译的运行码在目标机器上运行的环境。——百度百科

代码只是一段文本，代码需要运行（时）环境才能执行。

## 浏览器与Node.js

JS运行环境有两种，一种是浏览器运行环境，另一种是 Node.js 运行环境。

Node.js 使用 CommonJS 模块系统，在浏览器中使用 ES Modules 标准。

在实践中，这意味着你暂时在 Node.js 中使用 `require()`，在浏览器中使用 `import`。

## 历史

Node.js 诞生于2009年

ES6诞生于2015年

# 模块

三类模块：

1. 内置模块
2. 第三方模块
3. 自定义模块

内置模块和第三名模块使用：`require('xxx')`

自定义模块使用：`require('./xxx.js')`（可以省略js后缀名）

# npm

本地安装： `npm install xxx` （简写为`npm i xxx`），会在package.json中写入依赖并将模块安装到当前目录的node_modules目录下

全局安装： `npm install xxx -g`，会安装在自己定义的全局模块路径（D:\developer_tools\nodejs\node_global\node_modules）

# express框架

## 中间件

类似于 java 中服务层