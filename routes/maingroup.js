var express = require('express');
var router = express.Router();
var favicons = require('favicons')
var database = require('./lib/db.js');
var ref = database.ref('/');
/* GET home page. */

router.get('/', function(req, res, next) {
	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
	var page = 1;

	if (req.query.page) {
		page = req.query.page;
	}

	ref.child("groups").orderByChild("id").once("value", groups => {
		var data = Object.keys(groups.val()).map(function(_) {return groups.val()[_];});
		var myGroup_data="";
		var datalength = data.length
		data.splice(0, (page - 1) * 6);
		data.splice(6, Number.MAX_VALUE);

		database.ref('/users/' + res.locals.nickname + '/join_group').once("value", join_data => {
			if(join_data.exists()){
				myGroup_data = Object.keys(join_data.val()).map(function(_) {return join_data.val()[_];});
				console.log(myGroup_data);
			}
			res.render('maingroup', {
				data : data,
				datalength : datalength,
				page : page,
				myGroup_data : myGroup_data
			});
		});	
	});
});

module.exports = router;
