// // 1. 欧几里得算法
// let times1=0 // 统计计算次数
// const gcd1=(n1,n2)=>{
//     times1++
//     let remainder=n1%n2
//     if (remainder===0) {
//         return 
//     }else{
//         gcd1(n2,remainder)
//     }
// }

// // 2. 连续整数检测法
// let times2=0
// const gcd2=(n1,n2)=>{
//     while(n1%n2!==0){
//         times2++
//         n2--
//     }
// }
// gcd1(31415,14142)
// gcd2(31415,14142)
// console.log('times1:',times1);
// console.log('times2:',times2);


// const cal=(a,b,c)=>{
//     const temp=b**2-4*a*c
//     if (temp<0) { // 二次方程无解
//         return -1
//     }
//     else{
//         const res=[]
//         res.push((Math.sqrt(temp)+b)/2*a*b)
//         res.push((Math.sqrt(temp)-b)/2*a*b)
//         return res
//     }
// }