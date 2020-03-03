const express = require('express');
const router = express.Router();
const addressModel = require('../../controller/address')

router.post('/add', (req, res, next) => {
  addressModel.addAddress(req, res, next)
})
router.post('/list', (req, res, next) => {
  addressModel.getList(req, res, next)
})
router.post('/changeChecked', (req, res, next) => {
  addressModel.changeChecked(req, res, next)
})
router.post('/getCheckedAddress', (req, res, next) => {
  addressModel.getCheckedAddress(req, res, next)
})
router.post('/delete', (req, res, next) => {
  addressModel.addressDelete(req, res, next)
})
router.post('/info', (req, res, next) => {
  addressModel.getDetail(req, res, next)
})
router.post('/update', (req, res, next) => {
  addressModel.updateAddress(req, res, next)
})
module.exports = router;