const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let register = {
  sql: {
    select: 'select * from user where mobile=?',
    add: 'insert into user (username,mobile,password,status,userclass,salt) values (?,?,?,?,?,?)'
  },
  userRegister: async (req, res, next) => {
    let {username,mobile,code,password} = req.body
    let time = new Date().getTime()
    let data = await tools.getSmsCode(mobile);
    if (!data) {
        res.json({
            status: 0,
            data: [],
            msg: '请重新发送短信验证码'
          })
          return;
     }
     let canUse = !!(time - data.time < 10*60*1000);
     if(!canUse) {
        res.json({
            status: 0,
            data: [],
            msg: '短信验证码已失效，请重新发送'
          })
          return; 
     }
     if(code != data.code) {
        res.json({
            status: 0,
            data: [],
            msg: '短信验证码错误'
          })
          return;   
     }
     const result = await DB.query(register.sql.select,mobile);
     if(result.length > 0){
        res.json({
            status: 0,
            data: [],
            msg: '此手机号已注册'
          })
          return; 
     }
     let status = 1;
     let userclass = '会员'
     let salt = tools.getRandomSalt()
     password = tools.md5(password)
     const resultAdd = await DB.query(register.sql.add,[username,mobile,password,status,userclass,salt]);
     if(!!resultAdd){
        res.json({
            status: 1,
            data: [],
            msg: '注册成功'
          })
     }
  }
}
module.exports = register;