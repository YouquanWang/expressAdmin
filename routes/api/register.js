const express = require('express');
const router = express.Router();
const registerModel = require('../../controller/register')

router.post('/', (req, res, next) => {
  registerModel.userRegister(req, res, next)
})

module.exports = router;