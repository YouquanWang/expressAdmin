const express = require('express');
const router = express.Router();
const productModel = require('../../controller/product')
router.post('/list', productModel.getList)
router.post('/add', productModel.addProduct)
router.post('/delete', productModel.deleteProduct)
router.post('/info', productModel.getDetail)
router.post('/edit', productModel.editProduct)

module.exports = router