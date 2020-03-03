const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let order = {
  sql: {
    select: 'select id,title,pic,price from product where id in (?)',
    insert: 'insert into orders (address_id,ids,nums,ctime,ptime,totalPrice,totalNum,remark) values (?,?,?,?,?,?,?,?)'
  },
  orderPreview: async (req, res, next) => {
    let {nums,ids} = req.body
    let numArr = (nums + '').split(',')
    let result = await DB.query(order.sql.select, ids);
    let totalNum = 0;
    let totalPrice = 0;
    for (i=0;i<result.length;i++) {
      result[i].num = parseInt(numArr[i])
      totalNum += parseInt(numArr[i])
      totalPrice += result[i].price*numArr[i]
    }
    res.json({
      status: 1,
      data: {
        totalNum: totalNum,
        totalPrice: parseFloat(totalPrice).toFixed(2) + '',
        productlist: result
      },
      msg: ''
    })
  },
  createOrder: async (req, res, next) => {
    let {nums,ids,address_id,remark} = req.body
  let numArr = (nums + '').split(',')
  let result = await DB.query(order.sql.select, ids);
  let totalNum = 0;
  let totalPrice = 0;
  for (i=0;i<result.length;i++) {
    result[i].num = parseInt(numArr[i])
    totalNum += parseInt(numArr[i])
    totalPrice += result[i].price*numArr[i]
  }
  totalPrice = totalPrice.toFixed(2) + ''
  let ctime = new Date().getTime()
  let ptime = 0
  let result2 = await DB.query(order.sql.insert, [address_id,ids,nums,ctime,ptime,totalPrice,totalNum,remark])
  res.json({
    status: 1,
    data: {
      id: result2.id,
      price: result2.price,
      time: result2.ctime
    },
    msg: '订单创建成功'
  }) 
  }
}
module.exports = order;