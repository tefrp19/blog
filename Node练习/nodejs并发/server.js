const server=require("express")()

const busyTask=()=>{
    const startTime=Date.now();
    let currentTime=Date.now();
    let lastTime=0;
    while(lastTime<5000){
        currentTime=Date.now();
        lastTime=currentTime-startTime;
    }
}
// nodejs 同时收到 10 个计算密集型请求会排队处理请求
server.get("/busyTask",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    busyTask()
    res.send("done")
})

server.get("/commonTask",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send("done")
})

server.listen(8000)