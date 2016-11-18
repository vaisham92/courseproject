var express = require('express');
var app = express();
var auth = require('./server/authentication');
var test = require('./server/BinaryTest')
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());

//app.use('/', function(request, response) {
//	// Use response.sendfile, as it streams instead of reading the file into memory.
//	response.sendfile(__dirname + '/public/index2.html');
//});
app.post('/api/login',auth.login);
app.post('/api/userRegister',auth.register);
app.post('/api/BinaryTest' , test.BinaryTest);
app.post('/api/CreateQs' , test.CreateQs);
//app.get('/api/SubmitAns', test.SubmitAns);
//app.post("/api/savedata", eligibility_core.add);
/*
 * app.get('/', function(request, response) { response.render('pages/index');
 * });
 */
//app.post('/api/login',auth.login);
//app.use('/', function(request, response) {
//	// Use response.sendfile, as it streams instead of reading the file into memory.
//	response.sendfile(__dirname + '/public/index2.html');
//});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
