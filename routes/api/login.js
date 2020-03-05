const express = require('express');
const router = express.Router();
const loginModel = require('../../controller/login')

router.post('/', loginModel.userLogin)

module.exports = router;