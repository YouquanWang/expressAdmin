const express = require('express');
const router = express.Router();
const attributeModel = require('../../controller/attribute')

router.post('/list', attributeModel.getList)

module.exports = router