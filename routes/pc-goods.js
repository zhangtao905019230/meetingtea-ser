var express = require('express')
var router = express.Router()

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

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
