// 防抖、节流应用场景：事件触发过于频繁，降低回调函数执行次数
// 要点：
// 1.写防抖/节流的关键代码
// 2.要获取到event对象
// 防抖：事件发生 n 秒后再执行回调函数，若 n 秒内事件被重复触发，则重新计时
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
    console.log('this:',this); // debounce函数中绑定this就是为了让回调函数中能获取到this的值
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
function debounce(fn=function(){}, delay=1000) {
    let timer
    return function (event) { // 此时的 function 相当于addEventListener的第二个参数
        const context = this // 将 this 存到一个变量中
        if (timer) clearTimeout(timer) // 如果本次请求时上次请求还未执行，取消上次请求
        timer = setTimeout(() => {
            fn.call(context, event) // 调用fn函数，并将fn的this指定为外部函数的this，此时fn中的this指向绑定回调的dom元素，即input输入框
        }, delay);
    }
}

// 节流：事件发生，回调函数n秒内只运行一次，若在n秒内重复触发，只有一次生效
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
function throttle(fn=function(){}, delay=1000) {
    let timer=null
    return function (event) {
        if (!timer) { // 如果没有定时器就设置一个定时器，如果定时器还每执行就等待（定时器完成时）
            timer=setTimeout(() => {
                fn.call(this,event)
                // clearTimeout(timer) 这里不能用clearTimeout，其只是取消定时器，但定时器id还在
                timer=null
            }, delay);
        }
       
    }
}


