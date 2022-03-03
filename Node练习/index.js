setTimeout(_ => console.log('第1次setTimeout'))
setTimeout(_ => console.log('第1次setTimeout'),1)
setTimeout(_ => console.log('第1次setTimeout'),1000)

new Promise(resolve => {
    setTimeout(_ => {
        console.log('第2次setTimeout')
        resolve()
    })
    console.log('promise实例完成')
}).then(_ => {
    console.log('promise的回调')
})

console.log('同步代码')
