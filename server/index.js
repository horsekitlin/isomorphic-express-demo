import http from 'http';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Main from '../app/Hello.jsx';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import api from './api';
import logger from 'morgan';
import multipartMiddleware from 'connect-multiparty';

let app = express();
// html template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

// internal middleware
app.use(multipartMiddleware());
app.use(logger('dev'));

app.use('/*', (req, res) => {
    const html = ReactDOMServer.renderToString(<Main />);
    res.render('layout', {
        reactOutput : html
    });
})

/**
 * Error handler
 * **/

app.use(function(err, req, res, next) {
    //show error.html
    //res.status(200).json({status:err.status, message:err.msg, errors:err});
});

//意外的錯誤，應該要寫入資料庫，
process.on('uncaughtException', function(err) {
});

const PORT = process.env.PORT || 9000;

app.server = http.createServer(app);

app.server.listen(PORT, () => {
    console.log(`server listen to PORT ${PORT}`);
});

