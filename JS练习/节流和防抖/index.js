// 防抖、节流应用场景：事件触发过于频繁，降低回调函数执行次数
// 防抖：
const input = document.querySelector('input')

input.addEventListener('input', debounce(sendAjax, 500))
// 等价于下面这种形式
// input.addEventListener('input', function (e) { // 相当于addEventListener的第二个参数
//     const context = this // 将this存到一个变量中
//     const event = arguments // 获取 event 对象
//     if (timer) clearTimeout(timer) // 如果本次请求时上次请求还未执行，取消上次请求
//     timer = setTimeout(() => {
//         fn.call(context, event) // 调用fn函数，并将fn的this指定为外部函数的this，此时fn中的this指向input输入框
//     }, delay);
// })

const div = document.querySelector('#sendAjax')

function sendAjax(e) {
    console.log(e);
    // 监听input的值，每次其发生改变就调用模糊查询接口
    const sendReq = (data) => {
        // fetch(`xxx/${data}`) 发送网络请求
        div.innerHTML = `send ajax,req:${data}`
    }
    const data = this.value
    sendReq(data)
}
/**
 * 
 * @param {function}  fn 
 * @param {number} delay 
 */
function debounce(fn, delay) {
    let timer
    return function (event) { // 此时的 function 相当于addEventListener的第二个参数
        const context = this // 将 this 存到一个变量中
        if (timer) clearTimeout(timer) // 如果本次请求时上次请求还未执行，取消上次请求
        timer = setTimeout(() => {
            fn.call(context, event) // 调用fn函数，并将fn的this指定为外部函数的this，此时fn中的this指向绑定回调的dom元素，即input输入框
        }, delay);
    }
}

// 节流：
let times = 0
window.addEventListener('scroll', throttle(showScrollTimes, 500))
const showScrollTimesDiv = document.querySelector('.show-scroll-times')
showScrollTimesDiv.innerHTML = `${times++}`
function showScrollTimes(e) {
    showScrollTimesDiv.innerHTML = `${times++}`
}
/**
 * 
 * @param {function}  fn 
 * @param {number} delay 
 */
function throttle(fn, delay) {
    let flag = true
    return function () {
        if (flag) {
            fn.call(this)
            setTimeout(() => { //核心代码
                flag = true
            }, delay);
        }
        flag = false
    }
}


