// function _comma(number) {
//     // 补全代码
//     if (number<=999) {
//         return number+''
//     }
//     const arr=(number+'').split('')
//     let res=''
//     arr.splice(-3,0,',')
//     for (const ch of arr) {
//         res+=ch
//     }
//     return res
// }
// console.log(_comma(1234567));

const _getUniqueNums = (start, end, n) => {
    // 补全代码
    const set = new Set()
    const num = Math.floor(Math.random() * (Math.floor(end) - Math.ceil(start) + 1)) + Math.ceil(start);
    while (set.size <= n) {
        set.add(num)
    }
    return Array.from(set)
}
console.log(_getUniqueNums(2, 10, 1));