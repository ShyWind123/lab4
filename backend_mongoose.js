// 导入 mongoose 模块
const mongoose = require("mongoose");

// 设置默认 mongoose 连接
const mongoDB = "mongodb://user1:123456@8.134.215.31:27017/lab4";
// const mongoDB = "mongodb://8.134.215.31:27017/lab4";
mongoose.connect(mongoDB);
// 取得默认连接
const db = mongoose.connection;
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on("error", console.error.bind(console, "MongoDB 连接错误："));

module.exports = mongoose