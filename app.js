require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const postsRoute = require('./routes/posts');
const dbConnect = require('./config/db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client/build")));

dbConnect();

app.use('/posts', postsRoute);

module.exports = app;
