const express = require('express');
const router = express.Router();
const DB = require('../../model/mysqlDB');
const tools = require('../../model/tools');

router.post('/list', async (req, res, next) => {
  let sql = 'select * from attribute';
  let result = await DB.query(sql);
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

module.exports = router