const express = require('express');
const router = express.Router();
// const DB = require('../../model/mysqlDB');
const config = require('../../model/config')
const orderModel = require('../../controller/order')
const API = require('wechat-api')
const wechatPay = require('../../model/wechatPay')
const api = new API(config.pay.wxappid,config.pay.wxappsecret)

router.post('/create', (req, res, next) => {
  orderModel.createOrder(req, res, next)
})
router.post('/pay', async (req, res, next) => {
  let pay=new wechatPay();
  console.log(111)
  let data= await new Promise(function(resove,reject){
    pay.createOrder({
        notify_url : 'https://www.xinshangyun.com/order/pay', //微信支付完成后的回调
        out_trade_no : new Date().getTime(), //订单号
        body : 'buy',
        total_fee : '1', // 此处的额度为分
        spbill_create_ip :  req.ip.replace(/::ffff:/, '')
    }, function (error, responseData) {                
            if(error){
                    console.log(error);
                    reject(error);
            }
            // res.json(responseData);        /*签名字段*/
            resove(responseData);
    });  
});
res.json({
  status: 1,
    data: data,
    msg: ''
})
})
router.post('/preview', (req, res, next) => {
  orderModel.orderPreview(req, res, next)  
})
module.exports = router;