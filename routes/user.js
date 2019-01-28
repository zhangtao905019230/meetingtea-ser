var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var formidable = require('formidable');

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'


router.get('/getUsers', (req, res, next) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName)
    const collection = db.collection('user')
    collection.find({}).toArray((err, docs) => {
      res.send(docs)
      client.close()
    });
  });
});

router.post('/touxiang', (req, res, next) => {
  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public/images/upload';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {
    if (err) {
      res.locals.error = err;
      res.send({err:'err'})
      return;
    }
    var extName = 'png';  //后缀名
    switch (files.file.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.send('error', '只支持png和jpg格式图片');
      return;
    }
    var headPortraitPath = files.file.path;

    res.send({
      success:true,
      headPortraitPath:headPortraitPath
    });
  });
});

router.post('/login', (req, res, next) => {
  let obj = req.body
  if(obj.user_name == 'zhangtao25'&&obj.user_password == '123'){
    let resData = {
      role: 'root',
      user_name: obj.user_name,
      nickname: 'zhangtao25',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }else if(obj.user_name == 'gengcb1'&&obj.user_password == '123'){
    let resData = {
      role: 'user',
      user_name: obj.user_name,
      nickname: 'gengcb1',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }
  else if(obj.user_name == 'zouyq1'&&obj.user_password == '123'){
    let resData = {
      role: 'user',
      user_name: obj.user_name,
      nickname: 'zouyq1',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }
  else if(obj.user_name == 'gaoyz1'&&obj.user_password == '123'){
    let resData = {
      role: 'user',
      user_name: obj.user_name,
      nickname: 'gaoyz1',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }
  else{
    res.send('no')
  }
});



module.exports = router;
