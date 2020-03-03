const DB = require('../model/mysqlDB');
let address = {
  sql: {
    select: 'select * from address where userId=? and checked=?',
    update: 'update address set checked=? where userId=?',
    selectDesc: 'select * from address where userId=? order by checked desc',
    add: 'insert into address (name,mobile,address,checked,provinceId,provinceName,cityId,cityName,areaId,areaName,userId) values (?,?,?,?,?,?,?,?,?,?,?)',
    changeCheckId: 'update address set checked=? where userId=? and id=?',
    delete: 'delete from address where userId=? and id=?',
    selectDetail: 'select * from address where userId=? and id=?',
    updateDetail: 'update address set name=?,mobile=?,address=?,checked=?,provinceId=?,provinceName=?,cityId=?,cityName=?,areaId=?,areaName=? where userId=? and id=?'
  },
  addAddress: async (req, res, next) => {
    let {id} = req.user;
    let {name,mobile,address,checked,provinceId,provinceName,cityId,cityName,areaId,areaName} = req.body
    let checkResult = await DB.query(address.sql.select,[id,1]);
    if (checkResult.length < 0) {
        checked = 1
    }
    if (checked == 1) {
        let updateResult = await DB.query(address.sql.update,[0,id])
    }
    let result = await DB.query(address.sql.add, [name,mobile,address,checked,provinceId,provinceName,cityId,cityName,areaId,areaName,id])
    if (result) {
        res.json({
            status: 1,
            data: result[0],
            msg: '添加成功'
        })
    } else {
        res.json({
            status: 0,
            data: {},
            msg: ' 添加失败'
        }) 
    }
  },
  getList: async (req, res, next) => {
    let {id} = req.user;
    let result = await DB.query(address.sql.selectDesc,id);
    if (result) {
        res.json({
            status: 1,
            data: result,
            msg: ''
        })
    }
  },
  changeChecked: async (req, res, next) => {
    let {id} = req.user;
  let {address_id} = req.body
  let updateResult = await DB.query(address.sql.updatex,[0,id])
  let checkResult = await DB.query(address.sql.changeCheckId,[1,id,address_id]);
  if (checkResult) {
    res.json({
        status: 1,
        data: true,
        msg: '修改成功'
    })
  }
  },
  getCheckedAddress: async (req, res, next) => {
    let {id} = req.user;
    let result = await DB.query(address.sql.select,[id,1]);
    if (result) {
        res.json({
            status: 1,
            data: result,
            msg: ''
        })
    }
  },
  addressDelete: async (req, res, next) => {
    let {id} = req.user;
    let {address_id} = req.body
    let result = await DB.query(address.sql.delete,[id,address_id]);
    if (result) {
        res.json({
            status: 1,
            data: true,
            msg: '删除成功'
        })
    }  
  },
  getDetail: async (req, res, next) => {
    let {id} = req.user;
    let {address_id} = req.body
    let result = await DB.query(address.sql.selectDetail,[id,address_id]);
    if (result) {
        res.json({
            status: 1,
            data: result[0],
            msg: ''
        })
    }
  },
  updateAddress: async (req, res, next) => {
    let {id} = req.user;
  let {name,mobile,address,checked,provinceId,provinceName,cityId,cityName,areaId,areaName,address_id} = req.body
  if (checked == 1) {
    let updateResult = await DB.query(address.sql.update,[0,id])
  }
  let result = await DB.query(address.sql.updateDetail, [name,mobile,address,checked,provinceId,provinceName,cityId,cityName,areaId,areaName,id,address_id])
  if (result) {
    res.json({
        status: 1,
        data: result[0],
        msg: '编辑成功'
    })
  } else {
    res.json({
        status: 0,
        data: {},
        msg: ' 编辑失败'
    }) 
  }
  }
}
module.exports = address;