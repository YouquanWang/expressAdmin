const express = require('express');
const router = express.Router();
const addressModel = require('../../controller/address')

router.post('/add', addressModel.addAddress)
router.post('/list', addressModel.getList)
router.post('/changeChecked', addressModel.changeChecked)
router.post('/getCheckedAddress', addressModel.getCheckedAddress)
router.post('/delete', addressModel.addressDelete)
router.post('/info', addressModel.getDetail)
router.post('/update', addressModel.updateAddress)
module.exports = router;