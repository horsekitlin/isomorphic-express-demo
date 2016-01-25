import http from 'http';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from '../app/routes';
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

app.get('*', (req, res) => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            try{
                res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
            }catch(err){
                console.log(err);
            }
        } else {
            res.status(404).send('Not found')
        }
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

