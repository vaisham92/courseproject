var express = require('express');
var auth = require('./server/authentication');
var test = require('./server/BinaryTest')
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'BINARYAPP', cookie: { maxAge: 60000 }}));

app.post('/api/login',auth.login);
app.post('/api/userRegister',auth.register);
app.post('/api/BinaryTest' , test.BinaryTest);
app.post('/api/CreateQs' , test.CreateQs);
app.post('/api/addLevelToSession/:level',function(request,response){
	var level = request.params.level;
	request.session.level = level;
	response.send({
		"status":200,
		"message":request.session.level
	})
});
app.get('/api/getDetailsFromSession',function(request,response){
	response.send({
		"status":200,
		"message":request.session
	});
});
app.post('/api/SubmitAns', test.SaveAns);
app.get('/api/getRank/:testId/:level',test.getRank);
app.get('/api/getScoreboard/:level',test.getScoreboard_level);
app.get('/api/getUserRank/:testId/:level/:userId',test.getUserRank);
app.get('/api/getHallOfFame',test.getHallOfFame);

app.use('/', function(request, response) {
	// Use response.sendfile, as it streams instead of reading the file into memory.
	response.sendfile(__dirname + '/public/index.html');
});

//app.post('/api/login',auth.login);
//app.use('/', function(request, response) {
//	// Use response.sendfile, as it streams instead of reading the file into memory.
//	response.sendfile(__dirname + '/public/index.html');
//});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
