Array.prototype.myMap = function (fn) {
    const newArr=[]
    for (let index = 0; index < this.length; index++) {
        newArr.push(fn(this[index],index,this))
    }
    return newArr
};


// 使用
const arr=[1, 2, 3].myMap((item, index, arr) => {
    console.log(item)
    console.log(index);
    console.log(arr);
    return 'temp'
})
console.log(arr)

