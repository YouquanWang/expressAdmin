const express = require('express');
const router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools')
const app = express();

router.get('/',(req, res, next) => {
    console.log(res)
})
router.post('/',async (req,res,next) => {
    let { username, password } = req.body
    let sql = 'select * from admin where username=? and password=?';
    const result = await DB.query(sql, [username, tools.md5(password)]);
    if (result.length > 0) {
       req.session.isLogin = 1
       let userInfo = {
         id: result[0].id,
         username: result[0].username,
         logo: result[0].logo
       }
       req.session.userInfo = userInfo
       res.json({
           status: 1,
           data: userInfo,
           msg: '登录成功'
       })
    } else {
        req.session.userInfo = {}
        res.json({
            status: 0,
            data: [],
            msg: '用户名或密码错误'
        })
 
    }
    
})
module.exports = router;