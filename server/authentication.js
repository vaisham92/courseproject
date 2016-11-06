var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');


exports.login = function(request,response){	
	var email = request.body.email;
	var passord = request.body.password;
	mongo.connect(mongoURL, function() {
		var userDetails = mongo.collection('userDetails');
		mongoDbHelper.readOne(userDetails,{'email':email},null, function(data) {
				if(data==undefined){
					response.send({"Status":500,
						"Message": "No user Exists"});
					}else{
						var getPassword = data.password;
						if(passord===getPassword){
							response.send({
								"Status":200,
								"Message":"Validation Successfull"
							});
						}else{
							response.send({
								"Status":401,
								"Message":"Unauthorized"
							});
						}
					}
			});
		});
};

exports.register = function(request,response){
	var user = {};
	user.fname = request.body.fname;
	user.lname = request.body.lname;
	user.email = request.body.email;
	user.password = request.body.password;
	user.school = request.body.school;
	mongo.connect(mongoURL, function() {
	var userDetails = mongo.collection('userDetails');
	mongoDbHelper.readOne(userDetails,{'email':user.email},null,function(data){
		if(data==undefined){//}
			mongoDbHelper.insertIntoCollection(userDetails, user, function() {
			mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function(error, db) {
					
					if(error){
						response.send({"Status":500,
							"Message": "Unable to Register"});
						}else{
							response.send({"Status":200,
								"message":"Registration Successfull"});
						}
				});
			});
			}//if condition end
		else
		{ 
			response.send({Status:500,"Message":"User already registered with this email, Try another email!"})
		}
	});
	});
};