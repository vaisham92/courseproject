/**
 * New node file
 *
 */
var assert = require('assert');

exports.insertIntoCollection = function(collection, data, success) {
	collection.insertOne(data, function(err, result) {
		assert.equal(err, null);
		success();
	});
};

exports.updateCollection = function(collection, searchData, data, success) {
	collection.updateOne(searchData,data, function(err, results) {
		assert.equal(err, null);
		console.log(results);
		success();
	});
};

exports.readOne = function(collection, searchData, projection, success) {
	if(collection !== null) {
		if(projection !== null) {
			collection.findOne(searchData, projection, function(err, item) {
				assert.equal(err, null);
				success(item);
		});
		}
		else {
			collection.findOne(searchData, function(err, item) {
				assert.equal(err, null);
				success(item);
			});
		}
	}
};

exports.doesExistInDb = function(collection, searchData, success, failure) {
	collection.findOne(searchData, function(err, data) {
		//console.log("exists in db print: ");
		//console.log(JSON.stringify(data));
		if(data === null) {
			failure();
		}
		else {
			success();
		}
	});
};

exports.count = function(collection, searchData, success){
	if(searchData !== null) {
		collection.count(searchData, function(err, count) {
			success(count);
		});
	}
	else {
		collection.count(function(err, count){
			success(count);
		});
	}
};

exports.read = function(collection, searchData, projection, options, success) {
	if(options !== null) {
		if(projection !== null) {
			collection.find(searchData, options).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData, projection, options).toArray(function(err, data) {
				success(data);
			});
		}
	}
	else {
		if(projection !== null) {
			collection.find(searchData, projection).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData).toArray(function(err, data) {
				console.log(data);
				success(data);
			});
		}
	}
};

exports.readLastQuestion = function(collection, searchData, projection, options, success) {
	if(options !== null) {
		if(projection !== null) {
			collection.find(searchData, options).limit(1).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData, projection, options).limit(1).toArray(function(err, data) {
				success(data);
			});
		}
	}
	else {
		if(projection !== null) {
			collection.find(searchData, projection).limit(1).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData).limit(1).toArray(function(err, data) {
				console.log(data);
				success(data);
			});
		}
	}
};

exports.readTopThree = function(collection, searchData, projection, options, success) {
	if(options !== null) {
		if(projection !== null) {
			collection.find(searchData, options).limit(3).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData, projection, options).limit(3).toArray(function(err, data) {
				success(data);
			});
		}
	}
	else {
		if(projection !== null) {
			collection.find(searchData, projection).limit(3).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData).limit(3).toArray(function(err, data) {
				console.log(data);
				success(data);
			});
		}
	}
};


exports.readTen = function(collection, searchData, projection, options, success) {
	if(options !== null) {
		if(projection !== null) {
			collection.find(searchData, options).limit(10).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData, projection, options).limit(10).toArray(function(err, data) {
				success(data);
			});
		}
	}
	else {
		if(projection !== null) {
			collection.find(searchData, projection).limit(10).toArray(function(err, data) {
				success(data);
			});
		}
		else {
			collection.find(searchData).limit(10).toArray(function(err, data) {
				console.log(data);
				success(data);
			});
		}
	}
};