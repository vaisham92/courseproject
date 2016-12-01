var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');
var path = require('path');

var Factory = function(){
        console.log("user factory");
        this.createUser = function(type, req) {
                var user;

                if(type == "guestUser") {
                        console.log("guest user");
                        user = new GuestUser(req);
                } else if (type == "registeredUser") {
                        console.log("registered user");
                        user = new RegisteredUser(req);
                }

                user.usertype = type;
                return user;
        }
};

var GuestUser = function(request){
        this.fname = "guest";
        this.lname = "345";
        this.email = "anonymous@anonymous.com";
        this.password = "";
        this.school = "anonymous";
};

var RegisteredUser = function(request){
        this.fname = request.body.fname;
        this.lname = request.body.lname;
        this.email = request.body.email;
        this.password = request.body.password;
        this.school = request.body.school;
};

exports.register = function(request,response, utype){
        var factory = new Factory();
        var user = factory.createUser(utype, request);
        console.log("creating an user");

        mongo.connect(mongoURL, function() {
          var userDetails = mongo.collection('userDetails');
          mongoDbHelper.readOne(userDetails,{'email':user.email},null,function(data){
                if(data==undefined){
                        mongoDbHelper.insertIntoCollection(userDetails, user, function() {
                          mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function(error, db) {
                                        if(error){
                                                response.send({"Status":500,
                                                                "Message": "Unable to Register"});
                                        } else {
                                                if(utype=="guestUser"){
                                                        response.sendFile('index.html', { root: path.join(__dirname, '../public') });
                                                } else if(utype=="registeredUser"){
                                                        response.send({"Status":200, "Message":"Registration Successfull"});
                                                }
                                        }
                          });
                        });
                } else {
                        if (utype=="guestUser"){
                                response.sendFile('index.html', { root: path.join(__dirname, '../public') });
                        } else if(utype=="registeredUser"){
                                response.send({Status:500,"Message":"User already registered with this email, Try another email!"})
                        }
                }
          });
        });
};
