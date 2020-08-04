var createError = require('http-errors');
var express = require('express');
var multer = require('multer');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var socket = require('socket.io');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var url = require('url');
var request = require("request");

var index = require('./routes/index');
var users = require('./routes/users');
var loginPage = require('./routes/loginPage');
var elements = require('./routes/elements');
var generic = require('./routes/generic');
var insidegroup = require('./routes/insidegroup');
var maingroup = require('./routes/maingroup');
var newgroup = require('./routes/newgroup');
var signupPage = require('./routes/signupPage');
var homepage = require('./routes/homepage');
var profile = require('./routes/profile');
var profile_change = require('./routes/profile_change');


var app = express();
//啟用cookieSession
app.use(cookieSession({
    key: 'node',
    secret: 'HelloExpressSESSION'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/loginPage', loginPage);
app.use('/index', index);
app.use('/users', users);
app.use('/elements', elements);
app.use('/generic', generic);
app.use('/insidegroup', insidegroup);
app.use('/maingroup', maingroup);
app.use('/newgroup', newgroup);
app.use('/signupPage', signupPage);
app.use('/homepage', homepage);
app.use('/profile', profile);
app.use('/profile_change', profile_change);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
