function setName(obj) {//在内存中会新申明一个变量，值为person变量的值（即person对象的地址）
    obj.name="Nicholas"
    obj={}//person变量还是指向原对象
    obj.name="Greg"
}
let person={}
setName(person)
console.log(person.name)