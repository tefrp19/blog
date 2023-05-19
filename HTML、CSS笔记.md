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





# 块元素和行内元素的区别

1.块元素的特点：
a.总是在新行上开始；
b.高度、行高以及外边距和内边距都可控制；
c.宽度默认是它容器的100%，除非设定一个宽度；
d.他可以容纳内联元素和其他块元素。
2.内联元素的特点：
a.和其他元素都在同一行；
b.高，行高及外边距和内边距不可改变；
c.宽度就是它的文字和图片的宽度，不可改变；
d.内联元素只能容纳文本或者其他内联元素。

# BFC（块格式化上下文 Block Formatting Context）



BFC 目的是形成一个相**对于外界完全独立的空间**，**让内部的子元素不会影响到外部的元素**

bfc可以用于：

- 阻止[外边距重叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)





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



# script标签的加载

[浏览器解析标签是同步的，遇到script标签会等执行完（如果是外部标签，还需要等network请求完资源）再解析下面的标签](https://web.dev/howbrowserswork/#the-order-of-processing-scripts-and-style-sheets)

可以给script标签添加async与defer属性异步加载标签，async属性与defer类似，它们两者都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与defer不同的是，标记为async的脚本并不保证能按照它们出现的次序执行





# 浏览器、进程、JS引擎、主线程

每一个tab页是一个单独的进程，每个tab页有主线程、I/O线程

浏览器的渲染、js的执行和处理用户事件等操作都发生在主线程中

JS引擎负责执行js代码，无论是在浏览器（google为V8，FireFox为SpiderMonkey）还是Nodejs中（V8引擎）







# 页面渲染流程

[how browsers work](https://web.dev/howbrowserswork/#main-flow-examples)

![WebKit main flow.](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/S9TJhnMX1cu1vrYuQRqM.png?auto=format)

解析：1.dom树 2.cssom树
渲染：合成render树

WebKit uses the term "layout" for the placing of elements, while Gecko calls it "Reflow".

当DOM树解析到`script`标签时，会立即执行内容，直到执行完毕才会继续进行后续DOM解析（如果`script`是外部资源，还需等其下载完成后再执行。但浏览器做了优化，会平行请求外部`script`、`img`等资源 ）

当遇到第一个外部资源（img、script、css）时，浏览器会加载资源，在加载资源的同时浏览器会解析后续所有外部资源（平行地）

css的加载不会阻止dom的解析，但会阻止dom的渲染

css的加载会阻止js的执行

当DOM树解析完成后页面才可以进行交互



不可见的（`display:none`）元素不会被合成到render树中。



任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流（relayout）
改变元素的颜色等不改变几何位置的操作会触发重绘（repaint）
触发回流一定会触发重绘，反之则不一定

关于回流和重绘的优化：改变元素大小和位置用`transform`属性不会触发回流节省时间