let express = require('express');
let router = express.Router();
let request = require('request');
const multer  = require('multer');
let fs = require('fs')

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
  fs.writeFile('public/test.txt', req.file.originalname,function(err){
    if(err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
  res.json({filePath:'/uploads/'+file.originalname});
});

router.get('/init-touxiang', function(req, res, next) {
  fs.readFile('public/test.txt', 'utf8', function(err, data){
    console.log(data);
    res.send('/uploads/'+data)
  });
});


module.exports = router;
