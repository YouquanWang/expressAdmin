const express = require('express');
const router = express.Router();
const productModel = require('../../controller/product')
router.post('/list', (req, res, next) => {
  productModel.getList(req, res, next)  
})
router.post('/add', (req, res, next) => {
  productModel.addProduct(req, res, next)
})
router.post('/delete', (req, res, next) => {
  productModel.deleteProduct(req, res, next)
})

router.post('/info', (req, res, next) => {
  productModel.getDetail(req, res, next)
})

router.post('/edit', (req, res, next) => {
  productModel.editProduct(req, res, next)
})

module.exports = router