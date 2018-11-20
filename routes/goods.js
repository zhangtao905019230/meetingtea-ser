var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

router.all('/*', function(req, res, next) {
  let token = req.get("Authorization")
  jwt.verify(token, 'myjwttest', function(err, decoded) {      
    if (err) {
      return res.send({ success: false, message: '无效的token' });
    } else {
      return next();
    }
  });
})

router.get('/addGoods', (req, res, next) => {
	MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName);
    const collection = db.collection('goods');
    collection.insertMany([req.query],(err, result) => {
			res.send("ok");
		});
	});
});

router.get('/getGoods', (req, res, next) => {
	MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName)
    const collection = db.collection('goods')
    collection.find({}).toArray((err, docs) => {
			res.send(docs)
	    client.close()
    });
	});
});

router.get('/delGoods', (req, res, next) => {
	MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName);
    const collection = db.collection('goods');
    collection.deleteOne({_id:ObjectID("5be3fe53013ff81a60c76d64")},function(err, result) {
      res.send("ok")
    })
	});
});

router.get('/updateGoods', (req, res, next) => {
	MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName);
    const collection = db.collection('goods');
    let obj = JSON.parse(req.query['val'])
    let handleObj = {
      'classification': JSON.stringify(obj.classification),
      'zh_title': obj.zh_title,
      'zh_desc': obj.zh_desc,
      'en_title': obj.en_title,
      'en_desc': obj.en_desc,
      'saleoff': JSON.stringify(obj.saleoff),
      'price': obj.price,
      'no_discount_price': obj.no_discount_price,
      'figure_img': obj.figure_img
    }
    collection.updateOne({ _id : ObjectID(req.query['id']) },{ $set: handleObj },function(){
      res.send("ok")
    })
	});
});


router.get('/getEightHotGoods', (req, res, next) => {
	MongoClient.connect(url, (err, client) => {
	  const db = client.db(dbName)
    const collection = db.collection('goods')
    collection.find({}).toArray((err, docs) => {
			res.send(docs)
	    client.close()
    });
	});
});

module.exports = router;
