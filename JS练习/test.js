function deepClone(obj) {
    if (typeof obj === 'object') {

        const newObj = {}
        for (const key in obj) {
            newObj[key] = deepClone(obj[key])
        }
        return newObj
    } else {
        return obj
    }


    return newObj
}

const obj = {
    a: 1,
    obj: {
        b: 2
    }
}
console.log(obj)
const newObj = deepClone(obj)
newObj.obj.b=3
console.log(newObj)