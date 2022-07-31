function f$1(){
  return 'lib1'
}

function f(){
  return 'lib2'
}

// lib1中有f函数，lib2中也有f函数，第1条语句指明了选择使用lib1中的f函数，第2条语句指明了选择使用lib2中的f函数并将其重命名为f2
console.log(f$1());
console.log(f());
