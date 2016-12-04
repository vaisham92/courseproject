/**
 * Observer pattern for observing if there are any new/existing user with higher score, updates the scoreboad/hall of Fame accordingly
 */

var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');
/*
var Observer=function(){
	
	this.name="Observer";
		
	console.log("Observer called");	

	this.UpdateScoreboard=function(request,response){
	
	var level =  request.params.level;
	var query = {'level':level};
	var rank = 0;
	var options = {"sort": [['correctCount','desc'], ['time','asc']], "group":['level'] }
	mongo.connect(mongoURL, function() {
		var collection = mongo.collection('resultDirectory');
		mongoDbHelper.read(collection,query,null,options,function(data) {
			if(data==null){
				console.log("No entry found");
				response.send({"Status":500,
					"Message": "Unable to get Scoreboard for the level"});
			}
			else {
			
			var Arr = new Array();
			var res = new Array();
			var count = 0;
			//while(count < 3){
				for(var i=0 ; i < data.length;i++)
				{
					if(count < 3){
						console.log(count);
					var temp = data[i].username;    
					var index = Arr.indexOf(temp);      
					if(index==-1)
					   {
						 res[count] = ({"UserName" : data[i].username, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
					     Arr[count] = temp;
					         count++;
				   }
					}
				}
			//}
			response.send({"Status":200,"scoreboard":res});
			
			}
			});
		});	
};
};
*/



exports.SaveAns = function(request,response){

	console.log("SaveAns called");
	var qsBank = {};	
	//console.log(request);
	
	//console.log(request.session.user);
	qsBank.email = request.session.user.email; 
	console.log(qsBank.email);
	qsBank.testId = request.session.testId;
	console.log(qsBank.testId);
	qsBank.time = request.body.time;
	qsBank.level = request.session.level;
	console.log(qsBank.level);
	qsBank.School = request.body.School;
	qsBank.response = request.body.response;
	var count = 0;
	//console.log(qsBank.username);
	console.log(qsBank.response);
	

		for(var i=0; i < request.body.response.length;i++){	  
				
			  if(request.body.response[i].question.toString(2)==request.body.response[i].answer)
			  {
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
				//response.send({"Status":200,
					//"message":"Ans saved Successfully","QuizSubmitted":"Yes"});
				
						//call observer to fetch User rank and update Scoreboard
						var obs = new Observer(response,qsBank.level,qsBank.email,qsBank.testId);
						obs.UpdateUserRank();
						
					}
			
			});
		});
		});
};


var Observer=function(response,level,email,testId){

	this.name="Observer";
	console.log("in observer");
	this.level =  level;
	this.email= email;
	this.testId=testId;
	this.rank = 0;
	
	this.UpdateUserRank = function () {
		
	    var query = {'testId': testId, 'level': level};	   
	    var options = {"sort": [['correctCount', 'desc'], ['time', 'asc']]};
	    mongo.connect(mongoURL, function () {
	        var collection = mongo.collection('resultDirectory');
	        mongoDbHelper.read(collection, query, null, options, function (data) {
	            if (data == null) {
	                console.log("No entry found");
	                response.send({
	                    "Status": 500,
	                    "Message": "Unable to get user rank"
	                });
	            }
	            else{
	            	console.log("!!!")
	            	console.log(data);
	                for (var i = 0; i < data.length; i++) {
	                	console.log("!!!!!");
	                    if (data[i].email == email) {
	                        console.log("compairing");
	                    	this.rank = i + 1;
	                    }
	                }
	            	console.log(this.rank);
	            }
	            UpdateScoreboard();
	            
	            //response.send({"Status": 200, "User Rank": this.rank});
	        });
	    });
	};

	
	var UpdateScoreboard=function(){
						
		//UpdateUserRank();
		var query = {'level':level};
		console.log("UpdateScoreboard called");
		var options = {"sort": [['correctCount','desc'], ['time','asc']]}
		mongo.connect(mongoURL, function() {
		var resultDB = mongo.collection('resultDirectory');
		
			mongoDbHelper.read(resultDB,query,null,options,function(data) {
				
				if(data==null){
					console.log("No entry found");
					response.send({"Status":500,
						"Message": "Unable to Update Scoreboard for the level"});
				}
				else //{
				
					var Arr = new Array();
					var res = new Array();
					var count = 0;
					//console.log(data);

					for(var i=0 ; i < data.length;i++)
					{
						if(count < 3){
						var temp = data[i].email;    
						var index = Arr.indexOf(temp);      
						if(index==-1)
						   {
							
							 res[count] = ({"UserName" : data[i].email, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
						     Arr[count] = temp;
						         count++;
						   }
						}
					}						
					response.send({"Status":200,"Your Rank is":this.rank,"Scoreboard":res});
			});	
	});
	};
	
};
  