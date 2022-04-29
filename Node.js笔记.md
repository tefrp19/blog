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

`npm i xxx --save` ：在 npm 5之前的版本使用 `npm i xxx` 仅仅仅仅会把包下载到 node_modules/ 中，并不会同时修改 package.json。而使用 --save 选项就可以在安装包的同时，修改 package.json 文件。在 npm 5 之后的版本npm install 安装包时，默认便会修改 package.json 文件，所以 --save 选项已经不再需要了。

# express 框架

## 路由

api 接口

## 中间件

类似于 java 中服务层

# 记录一次node 项目的部署

最初决定用使用 yum 包管理工具在 linux 上安装软件，后来踩坑后决定使用宝塔面板安装 mysql、node、pm2、nginx 等。



## node 项目后台启动

1. node 全局安装pm2，使 node 项目在服务器后台运行，不占用一个终端，否则终端断掉服务就会断掉 

2. 创建 pm2Config.json 配置文件：

    ```json
    {
        "apps":{
                "name":"server",
                "exec":"app.js"//为 node 项目启动入口
            }
    }
    ```

2. 执行`pm2 start pm2Config.json`



## 踩坑

- centOS 8已停止更新， yum 安装软件阿里云源已经不提供文档支持。
- 前端项目放在 https 的腾讯云服务器上，后端项目放在 http 阿里云的服务器上，这种请求叫混合内容会导致**请求失败**，chrome 为了安全会阻止混合内容的请求。[混合内容是什么？](https://web.dev/what-is-mixed-content/#_11)
- 若服务器能请求服务器本地的接口，而外网请求不到服务器的接口，检查服务器防火墙端口是否对外开放，需开放端口才能访问服务



生产环境和开发环境保持一致是一件折磨的事情，记密码...



# 登录

核心思想：当登陆验证成功后生成一个用户登录信息，当访问一些需要登录的接口时需验证之前的信息

根据用户登录信息存储位置的不同，主要有两种解决方案：1.session 2.JWT

## session

存放在服务器，由服务器管理用户登录信息（用户名，过期时间等），响应给客户端sessionid（以后请求时带上sessionid，后端通过sessionid找到对应的用户名）

## JWT

存放在客户端，本质是服务器加密后的用户信息，请求时带上 token，由服务器解密 验证token

JWT 坏处：不可控，当用户改了密码或重新登录原来的 token 仍然生效。



todo：



1. jsdoc 使用方法
2. 捕获错误，进行操作

   

