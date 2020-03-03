const express = require('express');
const router = express.Router();
const productModel = require('../../controller/product')
router.post('/list', (req, res, next) => {
  productModel.getList(req, res, next)  
})
  router.post('/detial', (req, res, next) => {
    productModel.getDetail(req, res, next)
  })

  module.exports = router;