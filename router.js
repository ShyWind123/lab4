var express = require('express')
var router = express.Router()
router.use(express.json())
//导入数据库连接模块
const {Reservation}= require('./Reservation')




router.post('/reservation/add',async (req,res)=>{
    console.log('12334')
    let str =req.body
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