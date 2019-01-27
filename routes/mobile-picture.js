let express = require('express');
let router = express.Router();
let request = require('request');
const multer  = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
let upload = multer({ storage: storage });

var env = process.env.NODE_ENV || 'development';
let api = ''
if ('development' === env) {
  api = 'http://localhost:3030'
}else{
  api = 'http://101.132.46.146:3030'
}
router.post('/uploader', upload.single('avatar'), function(req, res, next) {
  let file = req.file;
  console.log(file)
  res.json({filePath:api+'/uploads/'+file.originalname});
});
module.exports = router;
