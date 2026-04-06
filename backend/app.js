require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectDB = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var cinemasRouter = require('./routes/cinemas');
var roomsRouter = require('./routes/rooms');
var showtimesRouter = require('./routes/showtimes');
var couponsRouter = require('./routes/coupons');

var app = express();

// Connect to Database
connectDB();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/cinemas', cinemasRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/showtimes', showtimesRouter);
app.use('/api/coupons', couponsRouter);

module.exports = app;
