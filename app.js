var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()
var indexRouter = require('./routes/index');


//connection a db 
 mongoose.connect(process.env.MONGO)
.then(()=>console.log('connected to db'))
.catch(err=>console.log(err.message))
var app = express();





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



app.listen(5500, () => {
  
  console.log(`Connected to 5500`); // to connectedd to the port
});
module.exports = app;
