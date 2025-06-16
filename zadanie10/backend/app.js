var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');
const tasksRouter = require('./routes/tasks');

var app = express(); 

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', tasksRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
