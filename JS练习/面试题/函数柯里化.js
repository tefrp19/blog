// 写一个sum函数，让sum(2)(3)返回5
const sum =(number)=>{
    let total=0
    return function(){
        total+=number
    }
}

console.log(sum(1)(2)(3));

