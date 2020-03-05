const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const config = require('./model/config')
const tools = require('./model/tools')
const DB = require('./model/mysqlDB');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')
const jwt = require('jsonwebtoken');
const xmlParser = require('express-xml');
const app = express();
const expressJWT = require('express-jwt');
const secretOrPrivateKey = "helloBigManing"  //加密token 校验token时要使用
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy
app.use(logger('dev'));
// app.use(xmlParser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  resave: true,
  rolling: true,
  name: 'testapp',
  saveUninitialized: true,
  unset: 'keep',
  cookie: { 
    maxAge: 86400000000,
    secure: false
   }
}))
app.use(express.static(path.join(__dirname, 'public')));
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a', encoding: 'utf8' }); // 记得要先把目录建好，不然会报错
app.use(logger('combined', { stream: accessLogStream }))
app.use(expressJWT({
  secret: secretOrPrivateKey   
}).unless({
  path: [/^\/admin\/*/,'/',/^\/api\/product\/*/,/^\/api\/register/,/^\/api\/login/,/^\/api\/sendSms/]  //除了这个地址，其他的URL都需要验证
}));
app.use((err, req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.token;
  // console.log(token)
  jwt.verify(token, config.secret, async (err, decoded) => {
    if(err){
      res.json({
        status: 0,
        data: [],
        msg: 'token过期，请重新登录',
        url: 'Login'
      })
    } else {
      req.user = decoded
      let sql = 'select salt from user where id=?';
      let result = await DB.query(sql, decoded.id);
      let salt = result[0].salt
      let sign = req.body.sign
      let json = req.body
       delete json.sign
       json.salt = salt
      let sign2 = tools.getSign(json)
      if (sign == sign2) {
        next()
      } else {
        res.json({
          status: 0,
          data: [],
          msg: '验签失败'
        })
      }
    }
  });
});
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", ' 3.2.1')
  next()
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
