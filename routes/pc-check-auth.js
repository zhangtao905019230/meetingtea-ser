var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

// router.all('/*', function(req, res, next) {
//   let token = req.get("Authorization")
//   jwt.verify(token, 'myjwttest', function(err, decoded) {      
//     if (err) {
//       console.log(token)
//       return res.send({ success: false, message: '无效的token' ,token: token});
//     } else {
//       return next();
//     }
//   });
// })

router.get('/', function(req, res, next) {
  let token = req.get("Authorization")
  // console.log(token)
  jwt.verify(token, 'myjwttest', function(err, decoded) {      
    if (err) {
      // console.log(token)
      return res.send({ success: false, message: '无效的token' ,token: token});
    } else {
      // return next();
      // console.log()
      return res.send({ success: true, message: '有效的token' ,token: token,usr_info:req.query});
      
    }
  });
})


module.exports = router;
