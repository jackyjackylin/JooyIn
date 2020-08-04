var express = require('express');
var router = express.Router();
var database = require('./lib/db.js');
var ref = database.ref('/');

router.get('/', function(req, res, next) {
  
	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
  res.locals.username = req.query.username;
  var save_group_data = "";
  var myGroup_data = "";
  var isMyUser = false;
  console.log(res.locals.username);
  if( res.locals.username==undefined ) {
    console.log("isMyUser");
    isMyUser = true;
    res.locals.username = res.locals.nickname;
  }
  else console.log("DEEEEFINDEDD");

  ref.child("users").orderByChild("email").equalTo(req.session.email).once("value", user =>{
    var user_data = user.val();
    database.ref('/users/' + res.locals.nickname + '/join_group').once("value", join_data => {
        if(join_data.exists()){
            myGroup_data = Object.keys(join_data.val()).map(function(_) {return join_data.val()[_];});
            console.log(myGroup_data);
            database.ref('/users/' + res.locals.nickname + '/save_group').once("value", save_data => {
                if(save_data.exists()){
                   save_group_data = Object.keys(save_data.val()).map(function(_) {return save_data.val()[_];});
                   console.log(save_group_data);
                   res.render('profile', {
                      user_data : user_data,
                      group_data : myGroup_data,
                      save_group_data : save_group_data,
                      isMyUser : isMyUser
                   });
                }else{
                   res.render('profile', {
                      user_data : user_data,
                      group_data : myGroup_data,
                      save_group_data : "",
                      isMyUser : isMyUser
                   });
                }
            });
        }else{
            database.ref('/users/' + res.locals.nickname + '/save_group').once("value", save_data => {
                if(save_data.exists()){
                   save_group_data = Object.keys(save_data.val()).map(function(_) {return save_data.val()[_];});
                   console.log(save_group_data);
                   res.render('profile', {
                      user_data : user_data,
                      group_data : "",
                      save_group_data : save_group_data,
                      isMyUser : isMyUser
                  });
                }else{
                  res.render('profile', {
                      user_data : user_data,
                      group_data : "",
                      save_group_data : "",
                      isMyUser : isMyUser
                  });
                }
            });
        }
    });
  });
});

module.exports = router;