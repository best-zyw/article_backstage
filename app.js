var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/admin/articles');
var categoriesRouter = require('./routes/admin/categories');
var settingsRouter = require('./routes/admin/settings');
var usersRouter = require('./routes/admin/users');
var recycleRouter = require('./routes/admin/recycle');
var photosRouter = require('./routes/admin/photos');
var loginRouter = require('./routes/admin/login');
var admin_login = require('./middlewares/admin_login');

var app = express();

app.use( cors( ) );
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/articles',admin_login(), articlesRouter);
app.use('/categories',admin_login(), categoriesRouter);
app.use('/settings',admin_login(), settingsRouter);
app.use('/users',admin_login(), usersRouter);
app.use('/recycle',admin_login(), recycleRouter);
app.use('/photos',admin_login(), photosRouter);
app.use('/login', loginRouter);

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
