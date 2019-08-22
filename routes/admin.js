const express = require('express');
const router = express.Router();
const loginRouter = require('./admin/login')
const url = require('url');
const product = require('./admin/product')
const category= require('./admin/category')
const attribute= require('./admin/attribute')
const DB = require('../model/mysqlDB');
const upload = require('../model/upload')
const app = express();
app.locals.__HOST__ = 'http://localhost:3000';
router.all('*',function (req,res,next){
    // let path = url.parse(req.request.url).pathname.substring(1);
    // console.log(path)
    // console.log(req.path)
    if(req.path !== '/login' && !req.session.isLogin)
    {
        res.json({
            status: 0,
            data: [],
            msg: '未登陆',
            url: '/login'
        })
    }
    console.log(req.session)
    // if (ctx.session.userinfo) {
    //     await next()
    // } else {
    //     if (path == 'admin/login' || path == 'admin/login/doLogin' || path == 'admin/login/captcha') {
    //         await next()
    //     } else {
    //        await ctx.redirect('admin/login')
    //     }
    // }
    next();
})
router.use('/product', product)
router.use('/category', category)
router.use('/attribute', attribute)
router.post('/status',async (req, res, next) => {
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
})
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
router.use('/login', loginRouter)

module.exports = router;