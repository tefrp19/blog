# HTML背景

互联网始于美国阿帕网1969年

英国人李爵士发明了HTML（最初只有HTML没有CSS） 1990年

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



## a（anchor）超链接

### href

`<a href="//baidu.com">test</a>`这是不规定协议的超链接

`<a href="javascript:;">test</a>`页面不会刷新也不会移到顶部，`<a href="href="#">test</a>`页面焦点会移到顶部

`<a href="#标题1">test</a>`页面会定位到id为`标题1`的元素

### target

`<a href="//baidu.com" target="_top|_self...">test</a>`

## table

设置表格单元格边距

## img

永远不要让图片变形，可只设置宽或只设置高

## form

autocomplete="off|on" 输入框是否可以让用户自动填充

form中`<input type="sumbit" value="提交"/>`与`<button>提交</button>`的区别：button标签中还能含svg等标签，使提交按钮更好看

# CSS重点

1. 不要死究，奇怪的现象先记住就行
2. 先写border进行测试
3. margin合并（上下合并）：相邻元素元素之间上下margin会**重叠**，父元素和第一个子元素、最后一个子元素margin会**重叠**。见[练习](CSS练习/margin合并.html)



# 文档流

内联（inline）元素从左到右排列，排到右边长度不够时会将自己切成两半，一半在上一行一半在下一行。

inline-block元素从左到右排列，排到右边长度不够时**另起一行**

块级（block）元素从上至下排列

`display:inline|block|inline-block`可以改变元素块级属性

内联元素宽度为内部内联元素宽度的和，**不能指定width和height**，高度为实际高度（line-hight的长度）不是可视高度（加padding也没用）

# 盒模型

盒模型从外到内有4个概念：margin、border、padding和内容

根据width的范围不同将盒模型划分为两类：content box和border box

content box：**width只包含内容**

border box：**width包含内容、padding和border**

# 为什么即使像footer这样页面**唯一的元素也建议写类选择器**不要写id选择器？

因为即使页面有相同id的元素，html不会报错，有可能遗忘之前写过的id而写相同的id，这时难以调试（先申明的元素先有样式，后写的元素会被忽略），如果写类选择器容易调试

# css需要清除默认样式的原因

html是先于css出来的，html为了区别标题和正文于是就有了默认的样式，但目前主流的审美都不接受默认样式

# 布局

设计思路：需要兼容IE9使用float布局；兼容大多数浏览器使用felx布局；只兼容最新浏览器使用grid布局