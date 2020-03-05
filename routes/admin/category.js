const express = require('express');
const router = express.Router();
const categoryModel = require('../../controller/category')

router.post('/list', categoryModel.getList)
router.post('/add', categoryModel.add)
router.post('/delete', categoryModel.delete)
router.post('/edit', categoryModel.edit)
module.exports = router