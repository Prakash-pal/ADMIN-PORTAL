var express = require('express');
var path = require('path');
var index = require('./routes/index');
let cors = require("cors");
var app = express();


// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});

const port = process.env.APP_PORT || 4000;

//console.log("Server is up and running on PORT :",process.env.DB_HOST);

app.listen(port,()=>{
    console.log("Server running on Port 3000")
})


module.exports = app;
