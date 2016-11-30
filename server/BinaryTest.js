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
	var level =  request.params.level;
	//var userId = parseInt(request.params.userId);
	var query = {'testId': testId,'level':level};
	console.log(query);
	var options = {"sort": [['correctCount','desc'], ['time','asc']]}
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,query,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
			}
			else
				response.send({"message":data});
			});
		});
};

exports.addToSesssion = function(request,response){
	var level = request.params.level;
	request.session.level = level;
	response.send({
		"status":200,
		"message":request.session.level
	});
}

exports.getFromSession = function(request,response){
	response.send({
		"status":200,
		"message":request.session
	});
}

exports.getUserRank = function(request,response){
	
	var testId = parseInt(request.params.testId);
	var level =  request.params.level;
	var userId = parseInt(request.params.userId);
	var query = {'testId': testId,'level':level};
	console.log(query);
	var rank = 0;
	var options = {"sort": [['correctCount','desc'], ['time','asc']]}
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,query,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
			}
			else
				//response.send({"data":data});
			for(var i=0 ; i < data.length;i++){
				if(data[i].userId==userId){
					rank = i+1;
				}
			}
				response.send({"User Rank":rank});
			});
		});
	
	
};

exports.getHallOfFame = function(request,response){

	var options = {"sort": [['correctCount','desc'], ['time','asc']], "group":['level'] }
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,null,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
			}
			else
				//response.send({"data":data});
			

			var res = new Array();
			var count = 0;
			var count_med = 0;
			var Arr_easy = new Array();
			var Arr_med = new Array();
			var res_easy = new Array();
			var res_med = new Array();
			for(var i=0 ; i < data.length;i++)
			{
				var level=data[i].level;
				if(level==="easy")
				{					
					var temp = data[i].userId;    
					var index = Arr_easy.indexOf(temp);      
					if(index==-1)
					   {
							res_easy[count] = ({"Userid: " : data[i].userId, "Best Score: " : data[i].correctCount, " Time : " : data[i].time })
						    Arr_easy[count] = temp;
						         count++;
					   }
				}
				
				else if(level==="medium")
					{
						var temp = data[i].userId;    
						var index = Arr_med.indexOf(temp);      
						if(index==-1)
						   {
							     res_med[count_med] = ({"Userid: " : data[i].userId, "Best Score: " : data[i].correctCount, " Time : " : data[i].time });
							     Arr_med[count_med] = temp;
							     	count_med++;
						
						   }
					}
			}
				
			res= ({"Easy":res_easy,"Medium":res_med});
			response.send({"HallOfFame":res});
			
			
			});
		});
	
	
};





exports.getScoreboard_level = function(request,response){
	
	var level =  request.params.level;
	var query = {'level':level};
	var rank = 0;
	var options = {"sort": [['correctCount','desc'], ['time','asc']], "group":['level'] }
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,query,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
			}
			else
				//response.send({"data":data});
			
			var Arr = new Array();
			var res = new Array();
			var count = 0;

			for(var i=0 ; i < data.length;i++)
			{

				var temp = data[i].userId;    
				var index = Arr.indexOf(temp);      
				if(index==-1)
				   {
				     res[count] = ({"Userid: " : data[i].userId, "Best Score: " : data[i].correctCount, " Time : " : data[i].time });
				     Arr[count] = temp;
				         count++;
			   }
			}
			
			
			console.log(Arr);
			response.send({"scoreboard":res});
			
		
			});
		});
	
	
};





