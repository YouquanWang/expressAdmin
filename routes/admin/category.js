const express = require('express');
const router = express.Router();
const categoryModel = require('../../controller/category')

router.post('/list', (req, res, next) => {
  categoryModel.getList(req, res, next) 
})
router.post('/add', (req,res,next) => {
  categoryModel.add(req,res,next)
})
router.post('/delete', (req, res,next) => {
  categoryModel.delete(req, res,next)
})
router.post('/edit', (req, res,next) => {
  categoryModel.edit(req, res,next)
})
module.exports = router