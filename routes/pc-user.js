var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

router.post('/reg', (req, res, next) => {
  MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName)
    const collection = db.collection('user')
    collection.find({'user_name':req.body.user_name}).toArray((err, docs) => {
      if(docs.length!=0){
        res.send({success:false, message:'用户存在'})
      }
      else{
        collection.insertMany([req.body],function(err, result){
          res.send({success:true, message:'注册成功'})
        })}
    });
	});
});



router.post('/login', (req, res, next) => {
  let obj = req.body

  MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName)
    const collection = db.collection('user')
    collection.find({'user_name':req.body.user_name}).toArray((err, docs) => {
      if(docs.length==0){
        res.send({success:false, message:'用户不存在'})
      }else{
        if(obj.user_name == docs[0].user_name&&obj.user_password == docs[0].user_password){
          let user_info = docs[0]
          let token = jwt.sign( user_info, 'myjwttest', { expiresIn: 60*60*24 })
          res.send({success:true, message:'用户名与密码匹配', user_info:user_info, token:token })
        }
        else{
          res.send({success:false, message:'用户名或密码错误'})
        }
      }
    });
	});
  
});



module.exports = router;