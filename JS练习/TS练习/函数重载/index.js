// 实现add函数的重载
// 1.传入的是数字，直接相加
// 2.传入的是数组，数组合并 arr3=arr1.concat(arr2)
// 函数实现
function add(item1, item2) {
    if (typeof item1 === 'number' && typeof item2 === 'number') {
        return item1 + item2;
    }
    if (item1 instanceof Array && item2 instanceof Array) {
        return item1.concat(item2);
    }
}
var test1 = add(123, 456);
var test2 = add([1, 2, 3], [4, 5, 6]);
console.log(test1);
console.log(test2);
