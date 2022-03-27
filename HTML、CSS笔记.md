# HTML背景

互联网始于美国阿帕网1969年

英国人李爵士发明了HTML（最初只有HTML没有CSS） 1990年

# 常见标签

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

# margin合并、塌陷

相邻元素元素之间上下margin会**重叠**。父元素和第一个子元素、最后一个子元素margin会**重叠**。见[练习](CSS练习/margin合并.html)

# 布局

设计思路：需要兼容IE9使用float布局；兼容大多数浏览器使用felx布局；只兼容最新浏览器使用grid布局

## float

步骤

1）子元素上加float:left和width

2）父元素上加

```css
.clearfix:after {
    content:'';
    display:block;
    clear:both;
}
```



## flex

步骤

1）父元素选择整体排列方向

```css
.container{
    display:flex;
    flex-direction:row（默认）|column;
}

```

2）



# BFC（块格式化上下文 Block Formatting Context）



BFC 目的是形成一个相**对于外界完全独立的空间**，**让内部的子元素不会影响到外部的元素**







# img 在CSS中是特殊的标签

[使用 CSS 为 \<img> 附加样式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#使用_css_为__附加样式)

img 标签为可替换元素，常设置为 `diplay:block;`，进行布局



# 使用 JS  操作页面

## offset

offsetTop、offsetLeft 以带有定位的父元素为准，返回元素的偏移值（不带单位），如没有，则以 body 为准



# 在手机上调试页面步骤

1. 手机通过USB连接到电脑
2. 手机设置为开发者模式
3. 电脑连上手机的热点，开启一台服务器（命令行`http-server -c-1`）
4. 电脑访问chrome://inspect/#devices
5. 手机打开电脑上的服务器，浏览相应内容

