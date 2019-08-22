const express = require('express');
const router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools')

router.get('/',(req, res, next) => {
    console.log(res)
})
router.post('/',async (req,res,next) => {
    let { username, password } = req.body
    let sql = 'select * from admin where username=? and password=?';
    const result = await DB.query(sql, [username, tools.md5(password)]);
    if (result.length > 0) {
       req.session.isLogin = 1
       res.json({
           status: 1,
           data: result,
           msg: '登录成功'
       })
    } else {
        res.json({
            status: 0,
            data: [],
            msg: '用户名或密码错误'
        })
 
    }
    
})
module.exports = router;