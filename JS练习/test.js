// es6
function unique1(arr) {
    return [...new Set(arr)]
}

// es5
function unique2(arr) {
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = true
    }
   return Object.getOwnPropertyNames(obj).map(item=>parseInt(item))
}