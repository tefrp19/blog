// 获取到遮罩层
const mask = document.querySelector('.mask')
// 打开遮罩层
const openBtn = document.querySelector('#btn')
openBtn.onclick = function () {
    mask.style.display = 'block'
}

// 关闭遮罩层
const closeBtn = document.querySelector('#close')
closeBtn.onclick = function () {
    mask.style.display = 'none'
}


// 拖拽思路：动态获取鼠标在页面中的位置，通过鼠标位置设置模态框位置（设置定位元素的 top、left）
// 1. 鼠标按下，获得鼠标在模态框中的位置 x、y
const modal = document.querySelector('.modal')
const header = modal.children[0]

header.addEventListener('mousedown', e => {
    // console.log(e);
    const x = e.pageX - modal.offsetLeft
    const y = e.pageY - modal.offsetTop
    // console.log(x,y);
    // 2.鼠标移动，计算 modal 的 top、left 值

    const move = e => {
        modal.style.left = e.pageX - x + 'px'
        modal.style.top = e.pageY - y + 'px'
    }

    document.addEventListener('mousemove', move)
    // 3. 鼠标弹起，移除事件
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
    })
})

// 点击到除 modal 外的部分，遮罩层关闭
document.addEventListener('mousedown', e=>{
    // console.dir();
    if (e.target.className==='mask') {
        mask.style.display='none'
    }
})

console.dir(modal.children[0]);
