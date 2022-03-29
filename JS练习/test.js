
(async () => {
    const userInfor = {
        username: 'frp1',
        password: 123
    }
    await fetch('//127.0.0.1:8000/loginTest', {
        method: 'post',
        body: JSON.stringify(userInfor),

        // 默认fetch请求不带上cookie
        credentials: "include"

    })

})()