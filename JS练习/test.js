function shallowClone(obj) {
    const newObj = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}

var obj = {
    age: 18,
    nature: ['smart', 'good'],
    names: {
        name1: 'fx',
        name2: 'xka'
    },
    love: function () {
        console.log('fx is a great girl')
    }
}

const obj2=shallowClone(obj)
obj2.age=19
obj2.names={
    name1:'new name'
}
console.log('obj2:',obj2);

console.log('obj:',obj);