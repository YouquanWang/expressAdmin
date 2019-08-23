const express = require('express');
const router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools')
router.post('/list', async (req, res, next) => {
  console.log(req.body)
  let {page, limit} = req.body
  let sqlTatol = 'select * from product';
  let total = await DB.query(sqlTatol)
  if (total.length>0) {
    let sql = 'select * from product order by id DESC limit ?,?';
    const result = await DB.query(sql, [(page - 1) * limit, limit]);
    if(result.length>0) {
      res.json({
        status: 1,
        data: result,
        msg: '',
        total: total.length
      })
    }
  } else {
    res.json({
      status: 1,
      data: [],
      msg: '',
      total: 0
    })
  }
})
router.post('/add', async (req, res, next) => {
  let {title,pic,catid,recommend,istop,status,groupImg,attr,content } = req.body
  let time = tools.formatDateTime(new Date());
  istop = istop?1:0;
  status = status?1:0;
  recommend = recommend?1:0;
  let visits = 0
  let author = 'admin';
  let sql = 'insert into product (title,pic,recommend,istop,status,time,author,visits,content,catid,attr,groupImg) values (?,?,?,?,?,?,?,?,?,?,?,?)';
    const result = await DB.query(sql, [title,pic,recommend,istop,status,time,author,visits,content,catid,attr,groupImg]);
    if(result){
      res.json({
        status: 1,
        data: [],
        msg: '添加成功'
      })
    } else {
      res.json({
        status: 0,
        data: [],
        msg: '添加失败'
      })
    }
})
router.post('/delete', async (req, res, next) => {
  let id = req.body.id
  let sql = `delete from product where id in (${id})`;
  const result = await DB.query(sql);
  if(result){
    res.json({
      status: 1,
      data: [],
      msg: '删除成功'
    })
  } else {
    res.json({
      status: 0,
      data: [],
      msg: '删除失败'
    })
  }
})

router.post('/info', async (req, res, next) => {
  let id = req.body.id;
  let sql = 'select * from product where id=?';
  const result = await DB.query(sql,id);
  if(result){
    res.json({
      status: 1,
      data: result,
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

router.post('/edit', async (req, res, next) => {
  let { id,title,pic,catid,recommend,istop,status,groupImg,attr,content } = req.body
  let time = tools.formatDateTime(new Date());
  istop = istop?1:0;
  status = status?1:0;
  recommend = recommend?1:0;
  let sql = 'update product set title=?, pic=?, groupImg=?,spec=?, price=?, recommend=?, istop=?, status=?, time=?, content=?, catid=? where id=?';
  let sql = 'insert into product (title,pic,recommend,istop,status,time,author,visits,content,catid,attr,groupImg) values (?,?,?,?,?,?,?,?,?,?,?,?)';
    const result = await DB.query(sql, [title,pic,recommend,istop,status,time,author,visits,content,catid,attr,groupImg]);
    if(result){
      res.json({
        status: 1,
        data: [],
        msg: '添加成功'
      })
    } else {
      res.json({
        status: 0,
        data: [],
        msg: '添加失败'
      })
    }
})

module.exports = router