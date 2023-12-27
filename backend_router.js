const express = require('express')
const router = express.Router()
//导入专家表
const Expert = require('./Expert')
//导入预约表
const Reservation = require('./Reservation')
//导入问题表
const Question = require('./Question')

router.use(express.json())


//查询所有专家
router.get('/expert/findall', async (req, res) => {
  const experts = await Expert.find();
  let experts_res = []
  for (let i in experts) {
    experts_res.push({
      "ID": experts[i].ID,
      "Name": experts[i].Name,
      "Score": experts[i].Score,
      "Introduce": experts[i].Introduce
    })
  }
  res.send(experts_res);
})

//查询在线专家
router.get('/expert/findall-online', async (req, res) => {
  const experts = await Expert.find({ Online: true });
  let experts_res = []
  for (let i in experts) {
    experts_res.push({
      "ID": experts[i].ID,
      "Name": experts[i].Name,
      "Score": experts[i].Score,
      "Introduce": experts[i].Introduce
    })
  }
  res.send(experts_res);
})

//通过id查询专家
router.get('/expert/find/:id', async (req, res) => {
  let experts = await Expert.find({ ID: req.params.id });
  res.send(experts);
})

//保存预约信息
router.post('/reservation/add', async (req, res) => {
  let str = req.body
  console.log(str)

  try {
    // 使用 async/await 处理保存操作
    const result = await Reservation.create(str);
    console.log('保存成功', result);
    res.send('保存成功');
  } catch (err) {
    console.error('保存失败', err);
    res.send('保存失败');
  }
})

//获取随机问题
router.get('/question/get-random', async (req, res) => {
  let questions_res = [];
  const questions = await Question.find();
  const count = questions.length;
  // const count = 20;
  let isSelected = [];
  for (let i = 1; i <= count; i++) {
    isSelected.push(false);
  }
  for (let i = 0; i < count / 2; i++) {
    let idx = Math.floor(Math.random() * count) + 1
    while (isSelected[idx]) {
      idx = Math.floor(Math.random() * count) + 1
    }
    isSelected[idx] = true;
    questions_res.push({
      "ID": questions[idx - 1].ID,
      "Content": questions[idx - 1].Content,
      "OptionA": questions[idx - 1].OptionA,
      "OptionB": questions[idx - 1].OptionB,
      "OptionC": questions[idx - 1].OptionC,
      "OptionD": questions[idx - 1].OptionD,
    });
  }
  res.send(questions_res);
})

//得到分数
router.post('/question/answer', async (req, res) => {
  console.log('进入了answer分析')
  let data = req.body

  console.log(data)
  //遍历answer字段，读取回答信息并封装
  let processAnswer
  if (data && data.answer) {
    processAnswer = data.answer.map(answer => {
      return {
        id: Number(answer.id),
        ans: answer.answer
      }
    })
  } else {
    res.send('数据错误')
  }
  let score = 0
  //数据库操作
  //遍历后端存的答案数组
  for (const answer of processAnswer) {
    //用id查询问题信息并返回
    const question = await Question.findOne({ ID: answer.id })
    //比对答案
    if (question && answer.ans == question.RightAnswer) {
      score += 10
    }
  }
  res.status(200).json({ score })
})

module.exports = router