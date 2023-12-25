// 引入mongodb
const mongoose = require('./backend_mongoose')

// 建立专家表
const ExpertSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Score: Number,
  Introduce: String,
  Online: Boolean,
})

// 建立用户数据库模型
const Expert = mongoose.model('expert', ExpertSchema)
module.exports = Expert