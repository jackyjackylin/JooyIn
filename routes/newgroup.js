var express = require('express');
var router = express.Router();
var database = require('./lib/db.js');
var ref = database.ref('/');

/* GET home page. */
router.get('/', function(req, res, next) {

	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;

	ref.child("group_with_user").orderByChild("user_name").equalTo("res.locals.nickname").once("value", usergroup =>{
		var myGroup_data = usergroup;
		res.render('newgroup', {
			title : 'Expresss',
			myGroup_data : myGroup_data
		});
	});
});
	// db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id', res.locals.nickname, function(err, rows) {

	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	var myGroup_data = rows;

	// 	console.log(myGroup_data);


	// 	res.render('newgroup', {
	// 		title : 'Expresss',
	// 		myGroup_data : myGroup_data
	// 	});
	// });


router.post('/creatgroup', function(req, res, next) {
	console.log("updata groups");
	console.log(req.body);
	var newPostKey = ref.child('groups').push().key;
	var postData = {
		group_id : newPostKey,
		formatted_address: req.body.formatted_address,
		group_name : req.body.group_name,
		start_datetime : req.body.start_date + " " + req.body.start_time,
		end_datetime : req.body.end_date + " " + req.body.end_time,
		sports_category : req.body.sports_category,
		group_people : req.body.group_people,
		group_location : req.body.group_location,
		detail : req.body.detail,
		position_lat : req.body.position_lat,
		position_lng : req.body.position_lng
	};
	var updates = {};
  	updates['/groups/' + newPostKey] = postData;
  	database.ref().update(updates);
  	res.setHeader('Content-Type', 'application/json');
	res.redirect('../maingroup');
});

module.exports = router;

	// var qur = db.query('INSERT INTO agroup SET ?', sql, function(err, rows) {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.redirect('/maingroup');

	// 	db.query('SELECT MAX(id) as id FROM agroup', function(err, rows2) {
	// 		if (err) {
	// 			console.log(err);
	// 		}

	// 		var data = rows2;
	// 		console.log(data);
	// 		var sql2 = {
	// 			user_name : req.session.nickname,
	// 			group_id : data[0].id,
	// 		};
	// 		var qur = db.query('INSERT INTO group_with_user SET ?', sql2,
	// 				function(err, rows3) {
	// 					if (err) {
	// 						console.log(err);
	// 					}
	// 				});
	// 	});
	// });
	// // res.render('newgroup', { title: 'Expresss' });

