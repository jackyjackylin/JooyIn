var express = require('express');
var router = express.Router();
var database = require('./lib/db.js');
var ref = database.ref('/');


router.get('/', function(req, res, next) {
	res.locals.error = null;
	res.render('signupPage', {
		title : 'Expresss'
	});
});

router.post('/', function(req, res, next) {
	res.locals.error = null;
	console.log(req.body.email);
	ref.child("users").orderByChild("email").equalTo(req.body.email).once("value", user => {
    if (user.exists()){
      	res.locals.error = '此email已經被註冊過!!';
      	console.log("此email已經被註冊過!!");
     	res.render('signupPage');
    }else{	
    	console.log("此email還沒被註冊過!!");
		var fs = require('fs');
		var sexPhoto;
		console.log(req.body.sex);
		if(req.body.sex == 'M' ) sexPhoto = 'male';
		else sexPhoto = 'female';
		fs.writeFileSync('./public/images/user_image/'+req.body.nickname+'.jpg', fs.readFileSync('./public/images/user_image/'+sexPhoto+'.jpg'));
       	var postData = {
       			email : req.body.email,
       			sex : req.body.sex,
       			birthday : "尚未填寫",
       			password : req.body.password,
       			join_group : "尚未填寫",
       			save_group : "尚未填寫",
				height : "尚未填寫",
				weight : "尚未填寫",
				living_place : "尚未填寫",
				favor_sport_1 : "尚未填寫",
				favor_sport_2 : "尚未填寫"
		};
		var updates = {};
  		updates['/users/' + req.body.nickname] = postData;
  		database.ref().update(updates);
		req.session.email = req.body.email;
		req.session.nickname = req.body.nickname;
		req.session.password = req.body.password;
		req.session.logined = true;
		res.setHeader('Content-Type', 'application/json');
		res.redirect('../maingroup');
	};
	});
});
module.exports = router;

