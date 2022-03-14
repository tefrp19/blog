/**
 * 
 * @param {array} arr 
 */
function unique1(arr) {
    return Array.from(new Set(arr))
}

let array = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4]
array = unique1(array)
// console.log(array);

function unique2(arr) {
    const map = new Map()
    for (const item of arr) {
        const temp = map.get(item) || ture
        map.set(item, temp)
    }
    return map.keys()
}
// array=unique2(array)
// console.log(array);

function wrapper(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 10)
            if (randomNum % 2 === 0) {
                resolve('成功')
            }
            else {
                reject('失败')
            }
        }, 1000);
    })
}

// wrapper().then(res => {
//     return Promise.resolve('success')
// }, err => {
//     return Promise.reject('failure')
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })
const p1=new Promise((resolve, reject)=>{
    const randomTime=Math.floor(Math.random() * 3000)
    setTimeout(resolve, randomTime, "成功");
})
const p2=new Promise((resolve, reject)=>{
    setTimeout(resolve, 2500, "超时");
})
Promise.race([p1,p2]).then(res => {
    console.log(res); 
}).catch(err => {
    console.log(err);
})
