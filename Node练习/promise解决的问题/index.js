// 目标：从三个文件中依次读取内容写入总内容中
let content = ""

// 1. 使用回调：产生回调地狱的问题，代码难以维护
const fs = require('fs')
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

// 2. 使用 promise：
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile('./f1.txt', (err, data) => {
            if (err) {
                reject('读取f1出错了')
            }
            resolve(data + '\n')
        })
    })
}


readFile().then(res => {
    return new Promise((resolve, reject) => {
        fs.readFile('./f2.txt', (err, data) => {
            if (err) {
                reject('读取f2出错了')
            }
            resolve(res + data + '\n')
        })
    })
}).then(res => {
    return new Promise((resolve, reject) => {
        fs.readFile('./f3.txt', (err, data) => {
            if (err) {
                reject('读取f3出错了')
            }
            resolve(res + data + '\n')
        })
    })
}).then(res=>{
    console.log('总内容：\n',res);
})
.catch(error=>{
    console.log('中途出错了');
    console.log('错误信息：',error);
})

