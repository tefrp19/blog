// 目标：从三个文件中依次读取内容写入总内容中
let content = ""

// 1. 使用回调：产生回调地狱的问题，代码难以维护
const fs = require('fs');
//#region 
// fs.readFile('./f1.txt', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     content += data + '\n'
//     fs.readFile('./f2.txt', (err, data) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         content += data + '\n'
//         fs.readFile('./f3.txt', (err, data) => {
//             if (err) {
//                 console.error(err)
//                 return
//             }
//             content += data + '\n'
//             console.log(content);
//         })
//     })
// })
//#endregion
// 2. 使用 promise：
//#region 
function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                // console.log(err);
                reject('读取f1出错了')
            }
            resolve(data + '\n')
        })
    })
}

// readFile('f1.txt').then(res => {
//     content+=res
//     return readFile('f2.txt')
// }).then(res => {
//     content+=res
//     return readFile('f3.txt')
// }).then(res => {
//     content+=res
//     console.log('总内容：\n', content);
// }).catch(error => {
//         console.log('中途出错了');
//         console.log('错误信息：', error);
//     })
//#endregion
// 3. 使用Promise.all并行执行异步（异步函数之间不存在依赖关系时使用这种方法）：
//#region 

// Promise.all([readFile('f1.txt'), readFile('f2.txt'), readFile('f3.txt')]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })
//#endregion

// 4. 异步的最佳方案
(async () => {
    try {
        content += await readFile('f1.txt')
        content += await readFile('f2.txt')
        content += await readFile('f3.txt')
    } catch (error) { // 如果 Promise 处理异常，则异常值被抛出
        console.log(error);
    }
    console.log(content);
})()

// 5.Promise.race的一个应用：当后端接口请求时长过长时可提示用户重试
const ajax = new Promise((resolve, reject) => {
    const randomTime = Math.floor(Math.random() * 3000)
    setTimeout(resolve, randomTime, "成功");
})
const timeout = new Promise((resolve, reject) => {
    setTimeout(resolve, 2500, "超时");
})
Promise.race([ajax, timeout]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
