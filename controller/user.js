const DB = require('../model/mysqlDB');
let user = {
  sql: {
    select: 'select username,mobile,avatar,userclass from user where id=?'
  },
  getUserInfo: async (req, res, next) => {
    let {id} = req.user;
  let result = await DB.query(user.sql.select, id)
  if (result.length>0) {
    res.json({
        status: 1,
        data: result[0],
        msg: ''
    })
  } else {
    res.json({
        status: 0,
        data: {},
        msg: '获取信息失败'
    }) 
  }
  }
}
module.exports = user;