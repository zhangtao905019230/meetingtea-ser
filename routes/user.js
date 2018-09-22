var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

function qx(){

}

router.get('/', (req, res, next) => {
  console.log('到我这边了')
  next()
})

router.get('/addusers', (req, res, next) => {
  
});

router.post('/login', (req, res, next) => {
  let obj = req.body
  if(obj.user_name == 'zhangtao25'&&obj.user_password == '123'){
    let resData = {
      role: 'root',
      user_name: obj.user_name,
      nickname: 'zhangtao25',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }else if(obj.user_name == 'gengcb1'&&obj.user_password == '123'){
    let resData = {
      role: 'user',
      user_name: obj.user_name,
      nickname: 'gengcb1',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }
  else if(obj.user_name == 'zouyq1'&&obj.user_password == '123'){
    let resData = {
      role: 'user',
      user_name: obj.user_name,
      nickname: 'zouyq1',
      phone_number: '18158899797'
    }
    let token = jwt.sign(resData, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({resData:resData,token:token})
  }
  else{
    res.send('no')
  }
});



module.exports = router;
