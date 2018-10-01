var express = require('express');
var router = express.Router();
var User = require('./../models/user');


/* GET users listing. */
// 这个users.js就是一级路由页面， 一级路由都是'/'
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 定义二级路由就是在一级路由页面里面定义的
// router.get('/test/index.html', function(req, res, next) {
//   res.render('test/index', { title: 'Express Very Good' });
// });

// 找到用户的路由
router.post('/login',function (req,  res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  // 进都没进来，可能是数据库原因或者数据库找不到对应数据
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    }else {
      if (doc) {
        // 1.写cookie到某个地方
        res.cookie('userId',doc.userId,{
          path: "/", // cookie放在根目录下
          maxAge: 1000*60*60
        });

        // 2.也可以服务端将用户的信息存储在session里面，随时可以拿取
        // req.session.user = doc;

        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName,
          }
        })
      }
    }
  });
});

module.exports = router;
