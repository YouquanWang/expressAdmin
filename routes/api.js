const express = require('express');
const router = express.Router();
const product = require('./api/product')
const register = require('./api/register')
const login = require('./api/login')
const user = require('./api/user')
const address = require('./api/address')
const order = require('./api/order')
const common = require('../controller/common')
router.use('/product', product)
router.use('/register', register)
router.use('/login', login)
router.use('/user', user)
router.use('/address', address)
router.use('/order', order)
router.post('/sendSms', common.sendSms)
module.exports = router;