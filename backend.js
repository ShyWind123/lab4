const express = require('express')
const cors = require('cors')
const app = express()

//使用路由
const userRouter = require('./backend_router')
app.use(userRouter)

app.use(cors())

//监听端口
app.listen(90, () => {
  console.log("已监听端口90");
})