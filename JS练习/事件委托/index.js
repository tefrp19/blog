const ul=document.querySelector('ul')
const showDataDiv=document.querySelector('.showData')
// 给每个项都绑定点击事件，浪费内存，并且在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件

// 如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的
ul.addEventListener('click',function (e) {
    console.dir(e);
    const target=e.target
    const itemId=target.dataset.id
    showDataDiv.innerHTML=`itemId为：${itemId}`
})