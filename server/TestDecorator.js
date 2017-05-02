/**
 * Decorator pattern for implementing BinaryTest
 */
var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');


var Test = function(collection){	
	//var level = request.body.level;
	this.collection = collection;
	console.log("In Test!");
	console.log(collection);
	this.BinaryTest = function() { 
		console.log("In BinaryTest of Test!")
		mongo.connect(mongoURL, function() {
		
		//mongo.collection('QuestionBank');
		
		mongoDbHelper.readTen(collection,null, function(data) {
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
};

var DecoratedTest = function(test,level,request,response){	
	

	this.BinaryTest = function() { 
		var level = request.body.level;
		mongo.connect(mongoURL, function() {
		var qsDetails = mongo.collection('QuestionBank');
		var collection = mongo.collection(test.collection);
		var query ={'level':level};
		console.log(collection);
		console.log(level);
		mongoDbHelper.readTen(collection,query,null,null,function(data) {
			console.log("In BinaryTest decorated-1");
				if(data==undefined){
					response.send({"Status":500,
						"Message": "No qs Exists"});
					}else{
						console.log("In BinaryTest of DecoratedTest!-5")
						console.log(data);
						/*var getQs = data.qs;
						response.send({"Status":200,
							"qs is":data.qs});
						console.log("In BinaryTest of DecoratedTest!-6")*/
						var Arr = new Array();
						var res = new Array();
						var count = 0;

						for(var i=0 ; i < data.length;i++)
						{
							//console.log("in for loop");
							var temp = data[i].qs;    
							var index = Arr.indexOf(temp);      
							if(index==-1)
							   {
								
							     res[count] = ({"Qs" : data[i].qs});
							     
							     Arr[count] = temp;
							         count++;
						   }
						}

						response.send({"Status":200,"qs":res});
					}
			});
		});
	};
};

exports.Quiz = function(request,response){
	console.log("In Quiz");
    var test = new Test("QuestionBank");
    //user.say();
    var level = request.body.level;
    var decoratedTest = new DecoratedTest(test, level,request,response);
    decoratedTest.BinaryTest();
    
};
 
