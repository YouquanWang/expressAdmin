const express = require('express');
const router = express.Router();
const upload = require('../model/upload')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', upload.single('file'),(req,res,next) =>{
  let path = req.file.path
  console.log(path)
  res.json({
    status: 1,
    data: [],
    msg: '上传成功',
    url: '',
    imgUrl: 'http://192.168.0.46/' + path.substring(6)
  })
})
module.exports = router;
