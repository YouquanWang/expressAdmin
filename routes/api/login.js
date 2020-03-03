const express = require('express');
const router = express.Router();
const loginModel = require('../../controller/login')

router.post('/', (req, res, next) => {
  loginModel.userLogin(req, res, next)
})

module.exports = router;