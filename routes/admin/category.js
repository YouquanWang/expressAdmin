const express = require('express');
const router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools')

router.post('/list', async (req, res, next) => {
    let sql = 'select * from category';
    const result = await DB.query(sql);
    if(result.length>0) {
      res.json({
        status: 1,
        data: tools.toTree(result),
        msg: ''
      })
    } else {
    res.json({
      status: 1,
      data: [],
      msg: ''
    })
  }
})
router.post('/add', async (req,res,next) => {
  let {name, pid}= req.body;
  let sql = 'insert into category (name,pid) values (?,?)';
  const result = await DB.query(sql, [name,pid]);
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
router.post('/delete', async (req, res,next) => {
  let id = req.body.id
  let sql = 'delete from category where id = ?';
  const result = await DB.query(sql,id);
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
router.post('/edit', async (req, res,next) => {
  let {id, name} = req.body
  let sql = 'update category set name=? where id=?';
  const result = await DB.query(sql, [name,id]);
  if(result){
    res.json({
      status: 1,
      data: [],
      msg: '编辑成功'
    })
  } else {
    res.json({
      status: 0,
      data: [],
      msg: '编辑失败'
    })
  }
})
module.exports = router