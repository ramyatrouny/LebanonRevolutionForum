require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const postsRoute = require('./routes/posts');
const dbConnect = require('./config/db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

dbConnect();

app.use('/posts', postsRoute);

module.exports = app;
