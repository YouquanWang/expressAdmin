const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let login = {
  sql: {
    selectAdmin: 'select * from admin where username=? and password=?',
    selectUser: 'select * from user where mobile=? and password=?',
    updateToken: 'update user set token=?'
  },
  adminLogin: async (req, res, next) => {
    let { username, password } = req.body
    const result = await DB.query(login.sql.selectAdmin, [username, tools.md5(password)]);
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
    
  },
  userLogin: async (req, res, next) => {
    let {mobile,password} = req.body
  password = tools.md5(password)
  const result = await DB.query(login.sql.selectUser,[mobile,password]);
  if (result.length>0) {
    let params = {
      id: result[0].id,
      mobile: result[0].mobile
    }
    let token = tools.getToken(params)
    const result2 = await DB.query(login.sql.updateToken,token);
    if(!!result2) {
        res.json({
          status: 1,
          data: {
            token: token,
            salt: result[0].salt
          },
          msg: '登陆成功'
        })
    }
  } else {
    res.json({
      status: 0,
      data: [],
      msg: '用户不存在或密码错误'
    })  
  }
  }
}

module.exports = login;