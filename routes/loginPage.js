/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var database = require('./lib/db.js');
var ref = database.ref('/');

router.get('/', function (req, res, next) {
  res.locals.error = null;
  res.render('loginPage', { title: 'Expresss' });
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var user_data = "";
    ref.child("users").orderByChild("email").equalTo(email).once("value", user =>{
      if(user.exists()){
          var nickname = Object.keys(user.val())[0]
          console.log(nickname);
          user_data = Object.keys(user.val()).map(function(_) {return user.val()[_];});
          console.log(user_data);
          if (user_data[0].password !== req.body.pass) {
            res.locals.error = '密碼錯誤';
            res.render('loginPage', { title: '' });
          }else{
            req.session.email = user_data[0].email;
            req.session.nickname = nickname;
            req.session.password = user_data[0].password;
            req.session.logined = true;
            res.redirect('../maingroup');
          }
      }else{
        res.locals.error = '使用者不存在';
        res.render('loginPage', { title: '' });
      }
    });  
});

/* 使用者登出頁面. */
router.get('/signout', function (req, res, next) {
  req.session.logined = false;
  res.redirect('../homepage');
  res.end();
});

module.exports = router;