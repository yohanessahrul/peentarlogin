require('dotenv').config()
const createError = require('http-errors');
      express = require('express');
      path = require('path');
      cookieParser = require('cookie-parser');
      logger = require('morgan');
      mongoose = require('mongoose');

      // router
      indexRouter = require('./routes/index');
      usersRouter = require('./routes/users');

      // express app
      app = express();

// database connect
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds241121.mlab.com:41121/peentar`, { useNewUrlParser: true }, () => {
  console.log('Database connected !');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
