const express = require('express');
const router = express.Router();
const userModel = require('../../controller/user')

router.post('/info', userModel.getUserInfo)

module.exports = router;