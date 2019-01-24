var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var chars = require('./routes/chars');
var roll = require('./routes/roll');

var app = express();

var port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/chars', chars);
app.use('/v1/roll', roll);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function(){
  console.log(`Server is up and listening on ${port}...`);
});

module.exports = app;