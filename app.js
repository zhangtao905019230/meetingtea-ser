var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var goodsRouter = require('./routes/goods');
var userRouter = require('./routes/user');
var pcGoodsRouter = require('./routes/pc-goods')
var pcUserRouter = require('./routes/pc-user')
var articleRouters = require('./routes/articles')
var pcCheckAuth = require('./routes/pc-check-auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization");
  res.setHeader("Access-Control-Expose-Headers", "*");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/goods' ,goodsRouter);
app.use('/user', userRouter);
app.use('/pc-goods', pcGoodsRouter);
app.use('/pc-user', pcUserRouter);
app.use('/articles', articleRouters);
app.use('/pc-check-auth', pcCheckAuth);

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
