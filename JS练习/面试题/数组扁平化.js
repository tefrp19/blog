const _flatten = arr => {
    // 补全代码
    const res = []
    function flat(array = []) {
        for (const item of array) {
            if (item instanceof Array) flat(item)
            else res.push(item)
        }
    }
    flat(arr)
    return res
}

console.log(_flatten([1, [2, [3, [4]]]])); // expected:[1,2,3,4]