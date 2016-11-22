var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');

exports.BinaryTest = function(request,response){	
	var level = request.body.level;
	mongo.connect(mongoURL, function() {
		var qsDetails = mongo.collection('QuestionBank');
		mongoDbHelper.readOne(qsDetails,{'level':level},null, function(data) {
				if(data==undefined){
					response.send({"Status":500,
						"Message": "No qs Exists"});
					}else{
						var getQs = data.qs;
						response.send({"Status":200,
							"Message":"Qs fetched from db","qs is":getQs});
					}
			});
		});
};


exports.SaveAns = function(request,response){

	var qsBank = {};	
	qsBank.userId = request.body.userId;
	qsBank.testId = request.body.testId;
	qsBank.time = request.body.time;
	qsBank.level = request.body.level;
	qsBank.response = request.body.response;
	var count = 0;
	for(var i=0; i < request.body.response.length;i++){	  
	  if(request.body.response[i].question.toString(2)==request.body.response[i].answer){
	    count++;
	  }
	}
	qsBank.correctCount = count;
		
	mongo.connect(mongoURL, function() {
	var qsDetails = mongo.collection('resultDirectory');
	mongoDbHelper.insertIntoCollection(qsDetails, qsBank, function() {
		mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function(error, db) {		
			if(error){
				response.send({"Status":500,
					"Message": "Unable to create Quiz Qs"});
				}else{
					response.send({"Status":200,
						"message":"Quiz Qs created Successfully"});
				}
		});
	});
	});
};

//need to modify--comment it before testing
exports.CreateQs = function(request,response){
	var qsBank = {};
	qsBank.qs = request.body.qs;
	qsBank.ans = request.body.ans;
	qsBank.level = request.body.level;
	mongo.connect(mongoURL, function() {
	var qsDetails = mongo.collection('QuestionBank');
	mongoDbHelper.insertIntoCollection(qsDetails, qsBank, function() {
		mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function(error, db) {		
			if(error){
				response.send({"Status":500,
					"Message": "Unable to create Quiz Qs"});
				}else{
					response.send({"Status":200,
						"message":"Quiz Qs created Successfully"});
				}
		});
	});
	});		
};

exports.getRank = function(request,response){
	
	var testId = parseInt(request.params.testId);
	var level = request.params.level;
	var query = {'testId': testId,'level':level};
	console.log(query);
	var options = {"sort": [['correctCount','desc'], ['time','asc']]}
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,query,null,options,function(data) {
				response.send({"message":data});
			});
		});
};



