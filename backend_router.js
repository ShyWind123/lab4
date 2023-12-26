const express = require('express')
const router = express.Router()
//导入专家表
const Expert = require('./Expert')
const { Reservation } = require('./Reservation')

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

router.post('/reservation/add', async (req, res) => {
  console.log('12334')
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

module.exports = router