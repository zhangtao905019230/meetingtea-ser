var express = require('express');
var router = express.Router();
var request = require('request');
const multer  = require('multer');

// Import mongodb dependency
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://101.132.46.146:27017'
const dbName = 'meetingtea'

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/notes-picture/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
let upload = multer({ storage: storage });

var env = process.env.NODE_ENV || 'development';
let api = '';
if ('development' === env) {
  api = 'http://localhost:3030'
}else{
  api = 'http://101.132.46.146:3030'
}

var testData = require('./../assets/testData')

router.get('/all', (req, res, next) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('notes');
    collection.find({}).toArray((err, docs) => {
      res.send(docs);
    })
  });
});

router.post('/new', upload.single('avatar'), (req, res, next) => {
  let file = req.file;
  // console.log(req.body.noteForm)
  let noteForm = JSON.parse(req.body.noteForm)
  noteForm.imagesList[0]['url'] = 'http://localhost:3030/notes-picture/'+file.originalname

  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('notes');
    collection.insertMany([noteForm], (err, result) => {
      res.send(noteForm);
    })
  });
});

module.exports = router;