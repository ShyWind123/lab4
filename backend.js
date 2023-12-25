const express = require('express')
const app = express()

//使用路由
const userRouter = require('./backend_router')
app.use(userRouter)

//监听端口
app.listen(80, () => {
  console.log("http://127.0.0.1:80");
})