var express = require('express');
var router = express.Router();
var database = require('./lib/db.js');
var ref = database.ref('/');
/* GET home page. */
router.get('/',function(req, res, next) {
	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
	res.locals.username = req.query.username;
	var group_id = req.query.group_id;
	var Jdata="";
	ref.child("groups").orderByChild("group_id").equalTo(group_id).once("value", groups => {
		database.ref('/groups/' + group_id + '/join_user').once("value", join_user => {
			if(join_user.exists()){
				Jdata = Object.keys(join_user.val()).map(function(_) {return join_user.val()[_];});
				console.log(Jdata);
				res.render('insidegroup', {
					group_id : group_id,
					data : groups.val(),
					Jdata: Jdata
				});
			}else{
				res.render('insidegroup', {
					group_id : group_id,
					data : groups.val(),
					Jdata: ""
				});
			}
		});
	});
});

router.get('/join', function(req, res, next) {
	var group_id = req.query.group_id;
	var nickname = req.session.nickname

	database.ref('/groups/'+group_id+'/join_user/').orderByChild("user_name").equalTo(nickname).once("value", user => {
		if (!user.exists()){
			var key = database.ref('/groups/'+group_id+'/join_user/').push(
				{	
					user_name: nickname,
				}
			).key;
		}
	});
	database.ref('/users/'+req.session.nickname+'/join_group/').orderByChild("group_id").equalTo(group_id).once("value", group => {
		if (!group.exists()){
			var group_data = database.ref('/groups/' + group_id);
			group_data.on("value", function(snapshot) {
				var s = snapshot.val().sports_category;
				var n = snapshot.val().group_name;
				console.log(s);
				var key = database.ref('/users/'+req.session.nickname+'/join_group/').push(
					{	
						group_id: group_id,
						sports_category: s,
						group_name: n
					}
				).key;
				console.log("Push key = " + key);
			});
		}else{
			console.log("already join!!");
		}
	});
	res.redirect('/insidegroup?group_id='+ group_id);
});

router.get('/save', function(req, res, next) {
	var group_id = req.query.group_id;
	database.ref('/users/'+req.session.nickname+'/save_group/').orderByChild("group_id").equalTo(group_id).once("value", group => {
		if (!group.exists()){
			var group_data = database.ref('/groups/' + group_id);
			group_data.on("value", function(snapshot) {
				var s = snapshot.val().sports_category;
				var n = snapshot.val().group_name;
				console.log(s);
				var key = database.ref('/users/'+req.session.nickname+'/save_group/').push(
					{	
						group_id: group_id,
						sports_category: s,
						group_name: n
					}
				).key;
				console.log("Push key = " + key);
			});
		}else{
			console.log("already save!!");

		}
	});
	res.redirect('../maingroup');
});

router.get('/quit', function(req, res, next) {
	var group_id = req.query.group_id;
	var user_name = req.session.nickname;
	var query = database.ref('/users/'+req.session.nickname+'/join_group/').orderByChild("group_id").equalTo(group_id);
	query.once("value", function(snapshot) {
  		snapshot.forEach(function(child) {
    		child.ref.remove();
		});
	});
	var query = database.ref('/groups/'+group_id+'/join_user/').orderByChild("user_name").equalTo(user_name);
	query.once("value", function(snapshot) {
  		snapshot.forEach(function(child) {
    		child.ref.remove();
		});
	});
	res.redirect('../maingroup');
});
module.exports = router;
