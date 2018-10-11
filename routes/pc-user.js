var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();


router.post('/reg', (req, res, next) => {
  console.log(req.body)
  res.send({success:true, message:'注册成功'})
});

router.post('/login', (req, res, next) => {
  let obj = req.body
  if(obj.user_name == 'zhangtao25'&&obj.user_password == '123'){
    let user_info = {
      role: 'root',
      user_name: obj.user_name,
      nickname: 'zhangtao25',
      phone_number: '18158899797'
    }
    let token = jwt.sign( user_info, 'myjwttest', { expiresIn: 60*60*24 })
    res.send({success:true, message:'用户名与密码匹配', user_info:user_info, token:token })
  }
  else{
    res.send({success:false, message:'用户名或密码错误'})
  }
});



module.exports = router;