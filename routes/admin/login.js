const express = require('express');
const router = express.Router();
const loginModel = require('../../controller/login')
const app = express();

router.get('/',(req, res, next) => {
    console.log(res)
})
router.post('/', loginModel.adminLogin)
module.exports = router;