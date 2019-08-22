const multer = require('multer');
var storage = multer.diskStorage({
    destination: 'public/upload/' + new Date().getFullYear() + ((new Date().getMonth() + 1)>9?(new Date().getMonth() + 1):'0'+(new Date().getMonth() + 1))+(new Date().getDate()>9?new Date().getDate():'0'+new Date().getDate()),
    filename: function (req, file, cb) { /*图片上传完成重命名*/
        var fileFormat = (file.originalname).split("."); /*获取后缀名  分割数组*/
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({
    storage: storage
});
module.exports = upload;