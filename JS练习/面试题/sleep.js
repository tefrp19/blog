const sleep = ms => {
    console.log('sleep开始');
    const startTime = new Date().getTime()
    while (true) {
        const now = new Date().getTime()
        if (startTime + ms < now) {
            break
        }
    }
    console.log('sleep结束');
}

console.log('sleep之前');
sleep(3000)
console.log('sleep之后');
