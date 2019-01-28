const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const chars = require('./routes/chars');
const roll = require('./routes/roll');
const damageTracker = require('./routes/damageTracker');

const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV != 'production') {
  require('dotenv').load();
}

const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/chars', chars);
app.use('/v1/roll', roll);
app.use('/v1/damage', damageTracker);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, function(){
  console.log(`Server is up and listening on ${port}...`);
});

module.exports = app;