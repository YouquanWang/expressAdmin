const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let product = {
  sql: {
    selectList: 'select count(*) as total from product;select * from product order by id DESC limit ?,?',
    insertProduct: 'insert into product (title,pic,price,recommend,istop,status,time,author,visits,content,catid,attr,groupImg) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
    selectDetail: 'select * from product where id=?',
    deleteProduct: 'delete from product where id=?',
    editProduct: 'update product set title=?,pic=?,price=?,recommend=?,istop=?,status=?,time=?,content=?,catid=?,attr=?,groupImg=? where id=?'
  },
  getList: async (req, res, next) => {
    let {page, limit} = req.body
      const result = await DB.query(product.sql.selectList, [(page - 1) * limit, limit]);
      res.json({
        status: 1,
        data: result[1],
        total: result[0][0].total,
        msg: '',
      })
  },
  addProduct: async (req, res, next) => {
    let {title,pic,price,catid,recommend,istop,status,groupImg,attr,content } = req.body
    let time = tools.formatDateTime(new Date());
    istop = istop?1:0;
    status = status?1:0;
    price = parseFloat(price).toFixed(2)
    recommend = recommend?1:0;
    let visits = 0
    let author = 'admin';
    const result = await DB.query(product.sql.insertProduct, [title,pic,price,recommend,istop,status,time,author,visits,content,catid,attr,groupImg]);
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
  getDetail: async (req, res, next) => {
    let id = req.body.id;
    const result = await DB.query(product.sql.selectDetail,id);
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
  },
  deleteProduct: async (req, res, next) => {
    let id = req.body.id
    const result = await DB.query(product.sql.deleteProduct,id);
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
  editProduct: async (req, res, next) => {
    let { id,title,pic,price,catid,recommend,istop,status,groupImg,attr,content } = req.body
    let time = tools.formatDateTime(new Date());
    istop = istop?1:0;
    status = status?1:0;
    recommend = recommend?1:0;
    price = parseFloat(price).toFixed(2)
    const result = await DB.query(product.sql.editProduct, [title,pic,price,recommend,istop,status,time,content,catid,attr,groupImg,id]);
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
module.exports = product;