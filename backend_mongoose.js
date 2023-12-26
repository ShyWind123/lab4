// 导入 mongoose 模块
const mongoose = require("mongoose");

// 设置默认 mongoose 连接
const mongoDB = "mongodb://user1:123456@8.134.215.31:27017/lab4";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接失败'))
db.once('open', function () {
  console.log('连接成功')
})

module.exports = mongoose