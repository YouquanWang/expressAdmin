const express = require('express');
const router = express.Router();
const attributeModel = require('../../controller/attribute')

router.post('/list', (req, res, next) => {
  attributeModel.getList(req, res, next)
})

module.exports = router