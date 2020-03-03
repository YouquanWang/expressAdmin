const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let category = {
  sql: {
    select: 'select * from category',
    add: 'insert into category (name,pid) values (?,?)',
    delete: 'delete from category where id = ?',
    edit: 'update category set name=? where id=?'
  },
  getList: async (req, res, next) => {
    const result = await DB.query(category.sql.select);
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
  },
  add: async (req, res, next) => {
    let {name, pid}= req.body;
  const result = await DB.query(category.sql.add, [name,pid]);
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
  },
  delete: async (req, res, next) => {
    let id = req.body.id
  const result = await DB.query(category.sql.delete,id);
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
  },
  edit: async (req, res, next) => {
    let {id, name} = req.body
  const result = await DB.query(category.sql.edit, [name,id]);
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
  }
}
module.exports = category;