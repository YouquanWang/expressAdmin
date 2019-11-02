var express = require('express');
var router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools')
router.post('/list', async (req, res, next) => {
    let {page, limit} = req.body
    let sqlTatol = 'select id,title,pic,price from product';
    let total = await DB.query(sqlTatol)
    if (total.length>0) {
      let sql = 'select id,title,pic,price from product order by id DESC limit ?,?';
      const result = await DB.query(sql, [(page - 1) * limit, limit]);
      res.json({
        status: 1,
        data: result,
        total: total.length,
        msg: '',
      })
    } else {
      res.json({
        status: 1,
        data: [],
        msg: '',
        total: 0
      })
    }
  })
  router.post('/detial', async (req, res, next) => {
    let id = req.body.id;
    let sql = 'select * from product where id=?';
    const result = await DB.query(sql,id);
    if(result){
      res.json({
        status: 1,
        data: result[0],
        msg: ''
      })
    } else {
      res.json({
        status: 0,
        data: [],
        msg: '产品不存在'
      })
    }
  })

  module.exports = router;