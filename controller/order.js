const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let order = {
  sql: {
    select: 'select id,title,pic,price from product where id in (?)',
    insert: 'insert into orders (address_id,user_id,ids,nums,ctime,ptime,totalPrice,totalNum,status,remark) values (?,?,?,?,?,?,?,?,?,?)',
    selectList: 'select count(*) as total from orders where status=? and user_id=?;select * from orders where status=? and user_id=? order by id DESC limit ?,?',
    selectAll: 'select count(*) as total from orders where user_id=?;select * from orders where user_id=? order by id DESC limit ?,?',
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
    let {id} = req.user;
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
  let status = 0
  let result2 = await DB.query(order.sql.insert, [address_id,id,ids,nums,ctime,ptime,totalPrice,totalNum,status,remark])
  res.json({
    status: 1,
    data: {
      id: result2.id,
      price: result2.price,
      time: result2.ctime
    },
    msg: '订单创建成功'
  }) 
  },
  getList: async (req, res, next) => {
    let {id} = req.user;
    let {page, limit, orderStatus} = req.body
     let status
      switch (orderStatus) {
        case 'waitPay':
          status = 1
          break;
        case 'paid':
          status = 2
          break;
        case 'waitTake':
          status = 3
          break;
        case 'success':
          status = 4
          break;
        default:
          status = ''
          break;
      }
      let result
      if (status) {
        result = await DB.query(order.sql.selectList, [status,id,status,id,(page - 1) * limit, limit]);
      } else {
        result = await DB.query(order.sql.selectAll, [id,id,(page - 1) * limit, limit]);
      }
      res.json({
        status: 1,
        data: result[1],
        total: result[0][0].total,
        msg: '',
      })
  }
}
module.exports = order;