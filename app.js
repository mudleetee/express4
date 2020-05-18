var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')
const User = require('./model/user')

passport.use(
  new LocalStrategy((username, password, callback) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return callback(err)
      }
      if (!user) {
        return callback(null, false)
      }
      if (bcrypt.compareSync(password, user.password)) {
        return callback(null, user)
      }
    })
  })
)
passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  })
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



app.use(cookieParser())
app.use(
  session({
    secret: 'my_super_secret',
    resave: false,
    saveUninitialized: false
  })
)

require('./db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
//new
app.use('/auth', require('./routes/auth'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
