var express = require('express');
var router = express.Router();

var request = require('request')
var cheerio = require('cheerio')


function proxyRequestArticleDetails(path,res){
  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString()); //利用cheerio对页面进行解析

      // console.log($('.paging_box a').eq(5).text())

      let totalPages = $('.paging_box a').eq(5).text()
      // console.log($('.article_lists li h5'))
      let arr = []
      for(let i=0;i<10;i++){
        let _id = $('.article_lists li h5 a').eq(i).attr('href')
        arr.push({
          index:i,
          img_src:$('.article_lists li .thumb a img').eq(i).attr('src'),
          title:$('.article_lists li h5 a').eq(i).text(),
          arctic_id:$('.article_lists li h5 a').eq(i).attr('href').slice(30,_id.length),
          dec:$('.article_lists li div .con').eq(i).text(),
          time:$('.article_lists li div p .fr').eq(i).text(),
          labels:$('.article_lists li div p .fl').eq(i).text()
        })
      }
      res.send({articleArr:arr,totalPages:totalPages})
    }
  });
}

function proxyRequestArticleContent(path,res){
  console.log(path)
  request(path, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body.toString()); //利用cheerio对页面进行解析

      // console.log($('.article .left h1').text())
      // console.log($('.article .left .sub').text())
      // console.log($('.article .left #content').html())
      let obj = {
        title: $('.article .left h1').text(),
        sub: $('.article .left .sub').text(),
        content: $('.article .left #content').html()
      }
      res.send(obj)
    }
  });
}

router.get('/details', (req, res, next) => {
  // res.send()
  // console.log(req.query.page)
  proxyRequestArticleDetails('https://www.chayu.com/article/lecha?p='+req.query.page,res)
});

router.get('/content', (req, res, next) => {
  // res.send()
  console.log(req.query.arctic_id)
  // https://www.chayu.com/article/198836
  proxyRequestArticleContent('https://www.chayu.com/article/'+req.query.arctic_id,res)
});

module.exports = router;
