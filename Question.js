// 引入mongodb
const mongoose = require('./backend_mongoose')

// 建立问题表
const QuestionSchema = new mongoose.Schema({
  ID: Number,
  Content: String,
  OptionA: String,
  OptionB: String,
  OptionC: String,
  OptionD: String,
  RightAnswer: String
})

// 建立用户数据库模型
const Question = mongoose.model('question', QuestionSchema)
module.exports = Question