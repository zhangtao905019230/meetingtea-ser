var express = require('express');
var router = express.Router();
var request = require('request')
var cheerio = require('cheerio');

var homepageData = require('./../assets/homepage')

router.get('/lv1-category', (req, res, next) => {
  let originUrl = 'https://m.youpin.mi.com/lasagne/page/'
  let path = originUrl + req.query.id

  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  });
});

router.get('/homepage', (req, res, next) => {
  res.send(homepageData)
});

// 。。
router.get('/lv1-goodscategory', (req, res, next) => {
  let reqBody = {"request": {"model": "Homepage", "action": "BuildClass", "parameters": {"id": -6}}}
  let originUrl = 'https://app.youpin.mi.com/app/shopv3/pipe'
  let path = originUrl

  // res.send('xxxx')

  request({
    url: path,
    method: 'POST',
    body: '%7B%22request%22%3A%7B%22model%22%3A%22Homepage%22%2C%22action%22%3A%22BuildClass%22%2C%22parameters%22%3A%7B%22id%22%3A-6%7D%7D%7D',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  }, (error, response, body) => {
    res.send(body)
  })
});

module.exports = router;
