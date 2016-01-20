import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
//import api from './api';
import logger from 'morgan';
import multipartMiddleware from 'connect-multiparty';

let app = express();
// html template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('datapath', __dirname + "/assets/");

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

app.get('/', (req, res) => {
    console.log(1111);
    res.render('layout');
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

