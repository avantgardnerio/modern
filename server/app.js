const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mysql = require('promise-mysql');
const http = require('http');
const knex = require('./db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/data', async (req, res) => {
  const con = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'modern'
  });
  console.log('------ connected --------');
  con.end();
  res.send('connected!');
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);

const start = () => {
  return knex.migrate.latest().then(() => {
    return new Promise((resolve, reject) => {
      server.on('error', err => reject(err));
      server.on('listening', () => {
        console.log(`Listening on ${server.address()}`);
        resolve(server);
      });
      server.listen(app.get('port'));
    })
  })
}

const stop = () => {
  return new Promise((resolve, reject) => {
    server.close(() => resolve());
  })
};

module.exports = {
  app,
  start,
  stop
};
