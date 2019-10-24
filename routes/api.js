var express = require('express');
var router = express.Router();
var product = require('./api/product')

router.use('/product', product)

module.exports = router;