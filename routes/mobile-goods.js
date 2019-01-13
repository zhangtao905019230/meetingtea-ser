var express = require('express');
var router = express.Router();
var request = require('request')
var cheerio = require('cheerio')

router.get('/lv2-list', (req, res, next) => {
  let originUrl = 'http://m.you.163.com/item/list'
	let path = originUrl+'?categoryId='
    +req.query.categoryId+'&subCategoryId='+req.query.subCategoryId

  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString());
      let str = $('script').eq(9).html();
      eval(str)
      res.send(ftlData)
    }
  });
});

router.get('/lv1-list', (req, res, next) => {
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
