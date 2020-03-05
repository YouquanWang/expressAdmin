const express = require('express');
const router = express.Router();
const loginRouter = require('./admin/login')
const url = require('url');
const product = require('./admin/product')
const category= require('./admin/category')
const attribute= require('./admin/attribute')
const common = require('../controller/common')
const upload = require('../model/upload')
const app = express();
app.locals.__HOST__ = 'http://localhost:4000';
router.all('*',function (req,res,next){
    if(req.path !== '/login' && !req.session.isLogin)
    {
        res.json({
            status: 0,
            data: [],
            msg: '未登陆',
            url: '/login'
        })
    }
    next();
})
router.use('/product', product)
router.use('/category', category)
router.use('/attribute', attribute)
router.post('/status', common.changeStatus)
router.post('/upload', upload.single('file'),(req,res,next) =>{
  let path = req.file.path
  res.json({
    status: 1,
    data: [],
    msg: '上传成功',
    url: '',
    imgUrl: app.locals.__HOST__ + path.substring(6)
  })
})
router.post('/userInfo', (req,res,next) =>{
    res.json({
      status: 1,
      data: req.session.userInfo
    })
  })
router.use('/login', loginRouter)

module.exports = router;