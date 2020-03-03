const DB = require('../model/mysqlDB');
const request = require('request')
const config = require('../model/config')
const urlencode = require('urlencode');
const tools = require('../model/tools')
let common = {
  changeStatus: async (req, res, next) => {
    let {id,statusName,status,dataBase} = req.body
    let sql = `update ${dataBase} set ${statusName}=? where id=?`;
    const result = await DB.query(sql, [status, id]);
    if(result){
        res.json({
            status: 1,
            data: [],
            msg: '操作成功',
            url: ''
        })
    } else {
        res.json({
            status: 0,
            data: [],
            msg: '操作失败',
            url: ''
        })
    }
  },
  sendSms: (req, res, next) => {
    let mobile = req.body.mobile
    if(!mobile){
      res.json({
        status: 0,
        data: [],
        msg: '请输入手机号',
      })
      return
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
    if(!reg.test(mobile)) {
      res.json({
        status: 0,
        data: [],
        msg: '请输入有效的手机号',
      })
      return;
    }
    let num = `${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`
    let url = `http://m.5c.com.cn/api/send/index.php?username=${config.sms.username}&password_md5=${tools.md5(config.sms.pwd)}&apikey=${config.sms.apiKey}&mobile=${mobile}&content=${urlencode(config.sms.content+num)}&encode=utf8`
     request(url, async (error, response, body) => {
       if(body.includes('success')) {
        let time = new Date().getTime()
        let sql = 'insert into sms (mobile,code,time) values (?,?,?)'
        const result = await DB.query(sql,[mobile,num,time])
        res.json({
          status: 1,
          data: [],
          msg: '短信发送成功',
        })
       } else {
        res.json({
          status: 0,
          data: [],
          msg: '短信发送失败',
        })
       }
    });
  }
}
module.exports = common;