const express = require('express');
const router = express.Router();
const productModel = require('../../controller/product')
router.post('/list', productModel.getList)
router.post('/detial', productModel.getDetail)

module.exports = router;