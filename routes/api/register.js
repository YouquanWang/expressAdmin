const express = require('express');
const router = express.Router();
const registerModel = require('../../controller/register')

router.post('/', registerModel.userRegister)

module.exports = router;