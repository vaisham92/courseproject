var express = require('express');
var auth = require('./server/authentication');
var test = require('./server/BinaryTest')
var quiz = require('./server/TestDecorator')
var observer = require('./server/ScoreboardObserver')
var bodyParser = require('body-parser');
var userFactory = require('./server/userFactory');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();


//var lessen = require('./server/lessen')


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'BINARYAPP', cookie: { maxAge: 600000 }}));


//<<<<<<< Updated upstream
//=======

//app.use('/', function(request, response) {
//	// Use response.sendfile, as it streams instead of reading the file into memory.
//	response.sendfile(__dirname + '/public/index.html');
//});


app.post('/api/login',auth.login);
app.post('/api/logout',auth.logout);
//app.post('/api/userRegister',auth.register);
app.post('/api/userRegister', function(request, response) {
                console.log("registering a new user");
                userFactory.register(request, response, "registeredUser");
                //response.send({"Status":200, "Message":"Registration Successfull"});
        });
app.post('/api/BinaryTest' , test.BinaryTest);
app.post('/api/Quiz' , quiz.Quiz);
app.post('/api/COnfirmLevel' , test.ConfirmLevel);
app.post('/api/CreateQs' , test.CreateQs);
app.post('/api/addLevelToSession/:level',test.createTest);
//app.post('/api/SubmitAns', test.submitTest);
//app.post('/api/SubmitAns' ,test.SaveAns);
app.post('/api/SubmitAnsObserver', observer.submitTest);
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

//app.post('/api/SubmitAns', test.SaveAns);
app.get('/api/getRank/:testId/:level',test.getRank);
app.get('/api/getScoreboard/:level',test.getScoreboard_level);
app.get('/api/getUserRank/:testId/:level/:username',test.getUserRank);
app.get('/api/getHallOfFame',test.getHallOfFame);
app.get('/api/getCron',test.cronJob);
app.get('/api/getCurrentTest',test.getCurrentTest);
app.post('/api/clearUserSession',auth.logoutUserSession);
app.get('/api/getNextQ', test.getNextQuestion);
app.post('/api/postAns', test.postAnswer);
app.post('/api/postAnswer/:testId', test.postAnswer);
app.get('/api/getResultF', function(request, response){
	response.send(request.session.resultF);
});
app.use('/', function(request, response) {
	console.log('creating a guest user');
        userFactory.register(request, response, "guestUser");
});


//app.post('/api/login',auth.login);
//app.use('/', function(request, response) {
//	// Use response.sendfile, as it streams instead of reading the file into memory.
//	response.sendfile(__dirname + '/public/index.html');
//});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
