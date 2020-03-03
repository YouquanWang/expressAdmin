const express = require('express');
const router = express.Router();
const userModel = require('../../controller/user')

router.post('/info', (req, res, next) => {
  userModel.getUserInfo(req, res, next)
})

module.exports = router;