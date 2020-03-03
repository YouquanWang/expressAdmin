const DB = require('../model/mysqlDB');
const tools = require('../model/tools')
let attribute = {
  sql: {
    select: 'select * from attribute'
  },
  getList: async (req, res, next) => {
    let result = await DB.query(attribute.sql.select);
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
  }
}
module.exports = attribute;