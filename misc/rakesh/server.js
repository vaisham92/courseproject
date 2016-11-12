require('./config/passport')(passport, config);

var express = require('express')
  , fs = require('fs')
  , passport = require('passport');


var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose');


mongoose.connect(config.db);


var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});



var app = express();

require('./config/express')(app, config, passport);

require('./config/routes')(app, passport, auth);


var port = process.env.PORT || 8090;
app.listen(port);
console.log('app running on port '+port);

exports = module.exports = app;
