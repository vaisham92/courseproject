exports.getImageByImageUrl = function(request, response) {
 -	response.setHeader('Content-type', 'image/png');
 -    mongodb.MongoClient.connect('mongodb://localhost:27017/amazondb', function(error, db) {
 -    	var bucket = new mongodb.GridFSBucket(db, {
 -      	  	chunkSizeBytes: 1024,
 -    		bucketName: 'images'
 -      	});
 -        bucket.openDownloadStreamByName(request.params.imageName).
 -        pipe(response).
 -        on('error', function(error) {
 -        }).
 -        on('finish', function() {
 -        });
 -    });
 +	try {
 +		var images = mongo.collection('images.files');
 +		dbHelper.doesExistInDb(images, {
 +			"filename" : request.params.imageName
 +		},function() {
 +			response.setHeader('Content-type', 'image/png');
 +		    mongodb.MongoClient.connect('mongodb://localhost:27017/amazondb', function(error, db) {
 +		    	var bucket = new mongodb.GridFSBucket(db, {
 +		      	  	chunkSizeBytes: 1024,
 +		    		bucketName: 'images'
 +		      	});
 +		        bucket.openDownloadStreamByName(request.params.imageName).
 +		        pipe(response).
 +		        on('error', function(error) {
 +		        }).
 +		        on('finish', function() {
 +		        });
 +		    });
 +		}, function() {
 +			var filePath = "public/images/default.jpg";
 +		    var stat = fs.statSync(filePath);
 +
 +		    response.writeHead(200, {
 +		        'Content-Type': 'image/png',
 +		        'Content-Length': stat.size
 +		    });
 +
 +		    var readStream = fs.createReadStream(filePath);
 +		    readStream.pipe(response);
 +		});
 +	}
 +	catch(error) {
 +		response.send({
 +			"status" : 404,
 +			"errmsg" : "Error: Unable to get images: " + error
 +		});
 +	}
  };