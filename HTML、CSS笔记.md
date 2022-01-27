# HTML背景

互联网始于美国阿帕网1969年

英国人李爵士发明了HTML（最初HTML没有CSS） 1990年

# HTML起手

```html
<!DOCTYPE html>
<!-- 网站语言 -->
<html lang="en">
<head>
    <!-- 字符集 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 完美视口 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

# 常见标签

## h1~h6

英语head+级别n，表示标题

## section

用来定义一个明确的主题，通常含有一个标题（h1~h6）。但如果是文章，通常会使用article标签来代替。

## main

主要内容

## aside

被包含在article元素中作为主要内容的附属信息部分，其中的内容可以是与当前文章有关的相关资料、名次解释，等等。

# 全局属性

id、class、style、contenteditable（true|false 规定元素内容是否可编辑）、hidden（布尔属性）tabindex（规定元素的 tab 键次序）等

# 常用内容标签

- a（anchor）超链接

- strong、em都表示强调，em侧重语气，strong侧重内容
- code 代码块
- pre 使HTML不忽略空格、回车、tab

本地与github建立连接，实时更新云端内容

# 为什么即使像footer这样页面**唯一的元素也建议写类选择器**不要写id选择器？

因为即使页面有相同id的元素，html不会报错，有可能遗忘之前写过的id而写相同的id，这时难以调试（先申明的元素先有样式，后写的元素会被忽略），如果写类选择器容易调试

# css需要清除默认样式的原因

html是先于css出来的，html为了区别标题和正文于是就有了默认的样式，但目前主流的审美都不接受默认样式