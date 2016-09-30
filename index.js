var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json())

app.use('/', function(request, response) {
	// Use response.sendfile, as it streams instead of reading the file into memory.
	response.sendfile(__dirname + '/public/index.html');
});


//app.post("/api/savedata", eligibility_core.add);
/*
 * app.get('/', function(request, response) { response.render('pages/index');
 * });
 */

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
