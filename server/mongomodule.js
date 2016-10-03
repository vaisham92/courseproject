/* AUTHOR : RAKESH DATTA     */
/* OCt   2016                */
/* SAN JOSE STATE UNIVERSITY */


 var mongod = require('mongodb');
 var mongoc = mongod.MongoClient;
 var conn_string = 'mongodb://localhost:27017/cmpe202';
 var query_param  = '';
 var response = '';

 var findQ = function(db, callback) {
        if (query_param.level == "easy") {   
           console.log("[INFO] : query param = level:"+query_param.level);
           var list = db.collection('question').find({"level":"easy"});
        } else if (query_param.level == "moderate") {
           console.log("[INFO] : query param = level:"+query_param.level);
           var list = db.collection('question').find({"level":"moderate"});
        } else if (query_param.level == "tough") {
           console.log("[INFO] : query param = level:"+query_param.level);
           var list = db.collection('question').find({"level":"tough"});
        } else {
           response = "Invalid query param: "+query_param.level;
           callback("400",response);
	}
 
        list.each(function(err, results) {
                 if(err) throw err;

                 if(results == null) {
                    callback("0",response);
                 } else {
                    response+=JSON.stringify(results)+",";
                 }
        });
 };


 var createQ = function(db, callback) {
        var list = db.collection('question').insertOne(query,
                                                      function(err, result) {
   							console.log("[INFO] : Inserted a record into Quiz Book");
							callback();
					              });		
 };

 var delQ = function(db, callback) {
        var list = db.collection('question').remove(query,
                                                   function(err, result) {
   							console.log("[INFO] : Deleted a record from Quiz Book"");
							callback();
					           });		
 };

 module.exports.queryHandler = function (queryParam, methodType, callback) {
     mongoc.connect(conn_string, function(err, db) {
	if (err) {
           console.log("[ERROR]: Could not connect to MongoDB server");
           console.log("[ERROR]: "+err);
        }				

        console.log("[INFO] : Successfully connected to MongoDB server");
        query_param = queryParam;
        response = '';
        console.log("[INFO] : query received");

        switch (methodType){
         case "GET" :     
           	     findQ(db, function(e, r) {
                     callback(e, r);   
                     db.close();
                     });
                     break;
    
         case "POST":
                     createQ(db, function(e, r){
                     callback(e, r);   
                     db.close();
                     });
                     break;
               
               
         case "DELETE":
                     delQ(db, function(e, r){
                     callback(e, r);   
                     db.close();
                     });
                     break;
         default   :
                     console.log("ERROR: method type unknown");       
                     db.close();
        }          
     }); 
 }
