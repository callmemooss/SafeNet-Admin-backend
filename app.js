var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pool =require('./db')
const cors = require("cors")
const passport = require("./passport")
const session =require("express-session")
const flash =require("connect-flash")


var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var autho_verifyRouter = require('./routes/autho_verify');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport initilize
app.use(
  session({
    secret:"your-secret-key",
    resave:false, 
    saveUninitialized:true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/autho_verify',autho_verifyRouter);


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
