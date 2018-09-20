var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/addusers', (req, res, next) => {
  
});

router.post('/login', (req, res, next) => {
  let obj = req.body
  console.log(req.body)
  if(obj.user_name == 'zhangtao'&&obj.user_password == '123'){
    let resData = {
      role: 'root',
      user_name: obj.user_name,
      phone_number: '18158899797'
    }
    let token = jwt.sign({'a':'123'}, 'myjwttest', { expiresIn: 60*60*24 })
    console.log(token)
    res.send({resData:resData,token:token})
  }else{
    res.send('no')
  }
});



module.exports = router;
