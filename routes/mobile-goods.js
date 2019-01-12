var express = require('express');
var router = express.Router();

var request = require('request')
var cheerio = require('cheerio')

router.get('/list', (req, res, next) => {
  console.log(req.query)
  let originUrl = 'http://m.you.163.com/item/list'
	let path = originUrl+'?categoryId='
    +req.query.categoryId

  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString());
      let str = $('script').eq(9).html();
      str = str.slice(13,str.length-2);
      let data = JSON.parse(str);
      // console.log(data);
      res.send(data);
    }
  });
});

router.get('/list-test', (req, res, next) => {
  console.log(req.query)
  let originUrl = 'http://m.you.163.com/item/list'
  let path = originUrl+'?categoryId='
    +req.query.categoryId

  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString());
      let str = $('script').eq(9).html()
      eval(str)

      res.send(jsonData);
    }
  });
});

router.get('/detail', (req, res, next) => {
  console.log(req.query)
  let originUrl = 'http://m.you.163.com/item/detail'
  let path = originUrl+'?id='+req.query.id

  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString());
      let str = $('script').eq(9).html()
      eval(str)
      res.send(jsonData);
    }
  });
});

module.exports = router;
