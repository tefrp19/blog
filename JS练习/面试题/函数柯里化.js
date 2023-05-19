function curry(fn) {
    const args = []
    return function inner(arg) {
        if (args.length === fn.length) return fn(...args)
        args.push(arg)
        return inner
    }
}

function add(a, b) {
    return a + b
}

const curriedAdd = curry(add)
console.log(curriedAdd(2)(3)()) // 5

