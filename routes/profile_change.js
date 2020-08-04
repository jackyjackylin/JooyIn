var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var multer = require('multer');
var database = require('./lib/db.js');
var ref = database.ref('/');

router.get('/', function(req, res, next) {

	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
    ref.child("users").orderByChild("email").equalTo(req.session.email).once("value", user =>{
		var user_data = user.val();
		console.log(user_data);
		res.render('profile_change', {
			user_data : user_data,
			myGroup_data : ""
		});
	});
});
router.post('/change',function(req, res, next) {
	res.locals.nickname = req.session.nickname;
	if (req.file) {
		var theFile = util.inspect(req.file);
		console.log(theFile);
		fs.rename('./public/images/user_image/tmp/'+req.file.filename, './public/images/user_image/'+res.locals.nickname+'.jpg', function(err) {
			if ( err ) console.log('ERROR: ' + err);
		});
	}
	else {
		console.log("YOYOYO");
	}
	var postData = {
		height: req.body.height,
		weight : req.body.weight,
		birthday : req.body.birthday,
		living_place : req.body.spot,
		favor_sport_1 : req.body.like_sport1,
		favor_sport_2 : req.body.like_sport2,
		diary : req.body.goal,
	};
	console.log("update data:");
	console.log(postData);
	var updates = {};
  	database.ref('/users/'+res.locals.nickname).update(postData);
  	res.setHeader('Content-Type', 'application/json');
	res.redirect('../maingroup');
});

module.exports = router;
