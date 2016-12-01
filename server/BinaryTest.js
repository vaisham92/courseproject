var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');


exports.BinaryTest = function(request,response){	
	var level = request.body.level;
	mongo.connect(mongoURL, function() {
		var qsDetails = mongo.collection('QuestionBank');
		var query ={'level':level};
		mongoDbHelper.readTen(qsDetails,query,null,null,function(data) {
		//mongoDbHelper.read(qsDetails,{'level':level},null, function(data) {
				if(data==undefined){
					response.send({"Status":500,
						"Message": "No qs Exists"});
					}else{
						
						var Arr = new Array();
						var res = new Array();
						var count = 0;

						for(var i=0 ; i < data.length;i++)
						{

							var temp = data[i].qs;    
							var index = Arr.indexOf(temp);      
							if(index==-1)
							   {
								
							     res[count] = ({"Qs" : data[i].qs});//, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
							     Arr[count] = temp;
							         count++;
						   }
						}
						
						
						console.log(Arr);
						response.send({"Status":200,"qs":res});
						
						
						
						
					}
			});
		});
};

exports.ConfirmLevel= function(request,response){	
	var level = request.body.level;
	mongo.connect(mongoURL, function() {
		var qsDetails = mongo.collection('QuestionBank');
		mongoDbHelper.readTen(qsDetails,{'level':level},null, function(data) {
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
	qsBank.username = request.body.username; 
	qsBank.testId = request.body.testId;
	qsBank.time = request.body.time;
	qsBank.level = request.body.level;
	qsBank.School = request.body.School;
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
					"Message": "Unable to save Ans"});
				}else{
					response.send({"Status":200,
						"message":"Ans saved Successfully"});
				}
		});
	});
	});
};

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
				response.send({"Status":500,
					"Message": "Unable to get rank"});
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
				response.send({"Status":500,
					"Message": "Unable to get user rank"});
			}
			else
			for(var i=0 ; i < data.length;i++){
				if(data[i].userId==userId){
					rank = i+1;
				}
			}
				response.send({"Status":200,"User Rank":rank});
			});
		});
	
	
};

exports.getHallOfFame = function(request,response){

	var options = {"sort": [['correctCount','desc'], ['time','asc']], "group":['level'] }
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,null,null,null,function(data) {
		//mongoDbHelper.readTen(collection,null,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
				response.send({"Status":500,
					"Message": "Unable to get Hall Of Fame!"});
			}
			else
			{
					
			var res = new Array();
			var count = 0;
			var count_med = 0;
			var count_diff =0;
			var Arr_easy = new Array();
			var Arr_med = new Array();
			var res_easy = new Array();
			var res_med = new Array();
			var Arr_diff = new Array();
			var res_diff = new Array();
			
			for(var i=0 ; i < data.length;i++)
			{
				var level=data[i].level;
				if(level==="easy" && count<3)
				{					
					var temp = data[i].username;    
					var index = Arr_easy.indexOf(temp);   
					
					if(index==-1)
					   {
						   res_easy[count] = ({"UserName" : data[i].username, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
						    //console.log(res_easy[count]);
						    Arr_easy[count] = temp;
						         count++;
						}
					  
				}
				
				else if(level==="medium" && count_med<3)
					{
						var temp = data[i].username;    
						var index = Arr_med.indexOf(temp); 
						
						if(index==-1)
						   {
								res_med[count_med] = ({"UserName" : data[i].username, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School});
								Arr_med[count_med] = temp;
						     		count_med++;
											
						   }
						
					}
				else if(level==="difficult" && count_diff<3)
				{
					var temp = data[i].username;    
					var index = Arr_diff.indexOf(temp);  
					
					if(index==-1)
					   {
								res_diff[count_diff] = ({"UserName" : data[i].username, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
								Arr_diff[count_diff] = temp;
						     		count_diff++;
					
					   }
					//}
				}
			}
				//console.log(res_easy);
				res= ({"Easy":res_easy,"Medium":res_med,"Difficult":res_diff});
				response.send({"Status":200,"HallOfFame":res});
			}
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
		mongoDbHelper.readTopThree(collection,query,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
				response.send({"Status":500,
					"Message": "Unable to get Scoreboard for the level"});
			}
			else {
				//response.send({"data":data});
			
			var Arr = new Array();
			var res = new Array();
			var count = 0;

			for(var i=0 ; i < data.length;i++)
			{

				var temp = data[i].username;    
				var index = Arr.indexOf(temp);      
				if(index==-1)
				   {
					 res[count] = ({"UserName" : data[i].username, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
				     Arr[count] = temp;
				         count++;
			   }
			}						
			//console.log(Arr);
			response.send({"Status":200,"scoreboard":res});
			
			}
			});
		});
	
	
};





