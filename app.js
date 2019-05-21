const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const trainsRoutes = require('./api/routes/trains');
const userRoutes = require('./api/routes/user');
const cardPaymentRoute = require('./api/routes/cardPaymentController');
const mobilePaymentRoute = require('./api/routes/mobilePaymentController');

mongoose.connect('mongodb+srv://irshika:' + process.env.MONGO_ATLAS_PW +
"@node-rest-trainapp-iigao.mongodb.net/test?retryWrites=true", {
    //useMongoClient: true
   // mongoose.connect(url, {useNewUrlParser: true})
   useNewUrlParser:true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended:false  
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    //security, don't allow unauthoraized web pages to access you
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})


//Routes which sholud handle requests
app.use('/trains', trainsRoutes);
app.use('/user', userRoutes);
app.use('/card-payment', cardPaymentRoute);
app.use('/mobile-payment', mobilePaymentRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;