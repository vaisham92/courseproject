var mongo = require("./mongo");
var mongoURL = 'mongodb://localhost:27017/binaryGame';
var mongoDbHelper = require('./mongo-db-helper');
var mongodb = require('mongodb');
var cron = require('node-cron');


//Subject:START
var Timer = function () {
    this.handlers = []; //registering the observers
};

Timer.prototype = {
    subscribeHandler: function (f) {
        this.handlers.push(f);
    },


    unsubscribeHandler: function (fn) {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    },

    startTimer: function () {
        this.handlers.forEach(function (item) {

            cron.schedule('*/15 * * * *', item);
        });
    }
}

exports.getCurrentTest = function (request, response) {

    var level = request.session.level;
    var options = {"sort": [['_id', 'desc']]};
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('ChallengeQuestions');
        mongoDbHelper.readLastQuestion(collection, {}, null, options, function (data) {
            if (data == null) {
                console.log("No entry found");
                response.send({
                    "Status": 500,
                    "Message": "Unable to get Questions"
                });
            }
            else
                var result = {};
            result.testId = data[0].testId;
            result.challenge = {};
            if (level == 'easy') {
                result.challenge = data[0].easy;
            } else if (level == 'medium') {
                result.challenge = data[0].medium;
            } else {
                result.challenge = data[0].hard;
            }
            request.session.testId = data[0].testId;
            response.send(result);
        });
    });

};

var getGroupChallenge = function (timeout) {
    var timer = new Timer(timerHandler);

    //Observer
    var timerHandler = function () {
        console.log("Timed Out.. Creating a Group Challenge");
        mongo.connect(mongoURL, function () {
            var qsDetails = mongo.collection('QuestionBank');
            var query = {'level': 'easy'};
            var message = {};
            message.testId = guid();
            message.easy = {};
            message.medium = {};
            message.hard = {};
            mongoDbHelper.read(qsDetails, {'level': 'easy'}, null, null, function (data) {
                message.easy = getRandom(data, 10);
                mongoDbHelper.read(qsDetails, {'level': 'medium'}, null, null, function (data) {
                    message.medium = getRandom(data, 10);
                    mongoDbHelper.read(qsDetails, {'level': 'hard'}, null, null, function (data) {
                        message.hard = getRandom(data, 10);
                        var ChallengeQuestions = mongo.collection('ChallengeQuestions');
                        mongoDbHelper.insertIntoCollection(ChallengeQuestions, message, function () {
                            mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function (error, db) {
                                console.log("Questions Pushed");
                            });
                        });
                    });
                });
            });
        });
    };

    //Register the Observer in the subject
    timer.subscribeHandler(timerHandler);

    //Start the Subject
    timer.startTimer();
};

getGroupChallenge();

exports.getCurrentTest = function (request, response) {
    var level = request.session.level;
    var options = {"sort": [['_id', 'desc']]};
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('ChallengeQuestions');
        mongoDbHelper.readLastQuestion(collection, {}, null, options, function (data) {
            if (data == null) {
                console.log("No entry found");
                response.send({
                    "Status": 500,
                    "Message": "Unable to get Questions"
                });
            }
            else {
                var result = {};
                result.testId = data[0].testId;
                result.challenge = {};
                if (level == 'easy') {
                    result.challenge = data[0].easy;
                } else if (level == 'medium') {
                    result.challenge = data[0].medium;
                } else {
                    result.challenge = data[0].hard;
                }
                var successResponse = {
                    "status": 200,
                    "message": "Successfully loaded Questions"
                };
                response.send(result);
            }
        });
    });
};

exports.cronJob = function (request, response) {
    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('QuestionBank');
        var query = {'level': 'easy'};
        var message = {};
        message.testId = guid();
        message.easy = {};
        message.medium = {};
        message.hard = {};
        mongoDbHelper.read(qsDetails, {'level': 'easy'}, null, null, function (data) {
            message.easy = getRandom(data, 10);
            mongoDbHelper.read(qsDetails, {'level': 'medium'}, null, null, function (data) {
                message.medium = getRandom(data, 10);
                mongoDbHelper.read(qsDetails, {'level': 'hard'}, null, null, function (data) {
                    message.hard = getRandom(data, 10);
                    var ChallengeQuestions = mongo.collection('ChallengeQuestions');
                    mongoDbHelper.insertIntoCollection(ChallengeQuestions, message, function () {
                        mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function (error, db) {
                            response.send(message);
                        });
                    });
                });
            });
        });
    });
};

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

exports.BinaryTest = function (request, response) {
    var level = request.body.level;
    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('QuestionBank');
        var query = {'level': level};
        mongoDbHelper.readTen(qsDetails, query, null, null, function (data) {
            //mongoDbHelper.read(qsDetails,{'level':level},null, function(data) {
            if (data == undefined) {
                response.send({
                    "Status": 500,
                    "Message": "No qs Exists"
                });
            } else {

                var Arr = new Array();
                var res = new Array();
                var count = 0;

                for (var i = 0; i < data.length; i++) {

                    var temp = data[i].qs;
                    var index = Arr.indexOf(temp);
                    if (index == -1) {

                        res[count] = ({"Qs": data[i].qs});//, "Score" : data[i].correctCount, "Time" : data[i].time, "School" : data[i].School });
                        Arr[count] = temp;
                        count++;
                    }
                }


                console.log(Arr);
                response.send({"Status": 200, "qs": res});


            }
        });
    });
};

exports.ConfirmLevel = function (request, response) {
    var level = request.body.level;
    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('QuestionBank');
        mongoDbHelper.readTen(qsDetails, {'level': level}, null, function (data) {
            if (data == undefined) {
                response.send({
                    "Status": 500,
                    "Message": "No qs Exists"
                });
            } else {
                var getQs = data.qs;
                response.send({
                    "Status": 200,
                    "Message": "Qs fetched from db", "qs is": getQs
                });
            }
        });
    });
};

exports.SaveAns = function (request, response) {

    var qsBank = {};
    qsBank.username = request.body.username;
    qsBank.testId = request.body.testId;
    qsBank.time = request.body.time;
    qsBank.level = request.body.level;
    qsBank.School = request.body.School;
    qsBank.response = request.body.response;
    var count = 0;
    for (var i = 0; i < request.body.response.length; i++) {
        if (request.body.response[i].question.toString(2) == request.body.response[i].answer) {
            count++;
        }
    }
    qsBank.correctCount = count;

    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('resultDirectory');
        mongoDbHelper.insertIntoCollection(qsDetails, qsBank, function () {
            mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function (error, db) {
                if (error) {
                    response.send({
                        "Status": 500,
                        "Message": "Unable to save Ans"
                    });
                } else {
                    response.send({
                        "Status": 200,
                        "message": "Ans saved Successfully"
                    });
                }
            });
        });
    });
};

exports.CreateQs = function (request, response) {
    var qsBank = {};
    qsBank.qs = request.body.qs;
    qsBank.ans = request.body.ans;
    qsBank.level = request.body.level;
    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('QuestionBank');
        mongoDbHelper.insertIntoCollection(qsDetails, qsBank, function () {
            mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function (error, db) {
                if (error) {
                    response.send({
                        "Status": 500,
                        "Message": "Unable to create Quiz Qs"
                    });
                } else {
                    response.send({
                        "Status": 200,
                        "message": "Quiz Qs created Successfully"
                    });
                }
            });
        });
    });
};


exports.getRank = function (request, response) {

    var testId = parseInt(request.params.testId);
    var level = request.params.level;
    //var userId = parseInt(request.params.userId);
    var query = {'testId': testId, 'level': level};
    console.log(query);
    var options = {"sort": [['correctCount', 'desc'], ['time', 'asc']]}
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('resultDirectory');
        mongoDbHelper.read(collection, query, null, options, function (data) {
            if (data == null) {
                console.log("No entry found");
                response.send({
                    "Status": 500,
                    "Message": "Unable to get rank"
                });
            }
            else
                response.send({"message": data});
        });
    });
};

exports.addToSesssion = function (request, response) {
    var level = request.params.level;
    request.session.level = level;
    response.send({
        "status": 200,
        "message": request.session.level
    });
};

exports.getFromSession = function (request, response) {
    response.send({
        "status": 200,
        "message": request.session
    });
};

exports.getUserRank = function (request, response) {

    var testId = parseInt(request.params.testId);
    var level = request.params.level;
    var userId = parseInt(request.params.userId);
    var query = {'testId': testId, 'level': level};
    console.log(query);
    var rank = 0;
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
            else
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userId == userId) {
                        rank = i + 1;
                    }
                }
            response.send({"Status": 200, "User Rank": rank});
        });
    });
};

exports.getHallOfFame = function (request, response) {

    var options = {"sort": [['correctCount', 'desc'], ['time', 'asc']], "group": ['level']};
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('resultDirectory');
        mongoDbHelper.read(collection, null, null, null, function (data) {
            //mongoDbHelper.readTen(collection,null,null,options,function(data) {
            if (data == null) {
                console.log("No entry found");
                response.send({
                    "Status": 500,
                    "Message": "Unable to get Hall Of Fame!"
                });
            }
            else {

                var res = new Array();
                var count = 0;
                var count_med = 0;
                var count_diff = 0;
                var Arr_easy = new Array();
                var Arr_med = new Array();
                var res_easy = new Array();
                var res_med = new Array();
                var Arr_diff = new Array();
                var res_diff = new Array();

                for (var i = 0; i < data.length; i++) {
                    var level = data[i].level;
                    if (level === "easy" && count < 3) {
                        var temp = data[i].email;
                        var index = Arr_easy.indexOf(temp);

                        if (index == -1) {
                            res_easy[count] = ({
                                "email": data[i].email,
                                "Score": data[i].correctCount,
                                "Time": data[i].time,
                                "School": data[i].School
                            });
                            //console.log(res_easy[count]);
                            Arr_easy[count] = temp;
                            count++;
                        }

                    }

                    else if (level === "medium" && count_med < 3) {
                        var temp = data[i].email;
                        var index = Arr_med.indexOf(temp);

                        if (index == -1) {
                            res_med[count_med] = ({
                                "email": data[i].email,
                                "Score": data[i].correctCount,
                                "Time": data[i].time,
                                "School": data[i].School
                            });
                            Arr_med[count_med] = temp;
                            count_med++;

                        }

                    }
                    else if (level === "difficult" && count_diff < 3) {
                        var temp = data[i].email;
                        var index = Arr_diff.indexOf(temp);

                        if (index == -1) {
                            res_diff[count_diff] = ({
                                "email": data[i].email,
                                "Score": data[i].correctCount,
                                "Time": data[i].time,
                                "School": data[i].School
                            });
                            Arr_diff[count_diff] = temp;
                            count_diff++;

                        }
                        //}
                    }
                }
                //console.log(res_easy);
                res = ({"Easy": res_easy, "Medium": res_med, "Difficult": res_diff});
                response.send({"Status": 200, "HallOfFame": res});
            }
        });
    });
};

exports.getScoreboard_level = function (request, response) {

    var level = request.params.level;
    var query = {'level': level};
    var rank = 0;
    var options = {"sort": [['correctCount', 'desc'], ['time', 'asc']], "group": ['level']}
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('resultDirectory');
        mongoDbHelper.readTopThree(collection, query, null, options, function (data) {
            if (data == null) {
                console.log("No entry found");
                response.send({
                    "Status": 500,
                    "Message": "Unable to get Scoreboard for the level"
                });
            }
            else {
                //response.send({"data":data});

                var Arr = new Array();
                var res = new Array();
                var count = 0;

                for (var i = 0; i < data.length; i++) {

                    var temp = data[i].email;
                    var index = Arr.indexOf(temp);
                    if (index == -1) {
                        res[count] = ({
                            "email": data[i].email,
                            "Score": data[i].correctCount,
                            "Time": data[i].time,
                            "School": data[i].School
                        });
                        Arr[count] = temp;
                        count++;
                    }
                }
                //console.log(Arr);
                response.send({"Status": 200, "scoreboard": res});

            }
        });
    });


};

exports.createTest = function (request, response) {
    var level = request.params.level;
    request.session.challenge = new Object();
    request.session.level = level;
    if (request.session.challenge == undefined)
        request.session.challenge = new Object();
    var options = {"sort": [['_id', 'desc']]};
    mongo.connect(mongoURL, function () {
        var collection = mongo.collection('ChallengeQuestions');
        mongoDbHelper.readLastQuestion(collection, {}, null, options, function (data) {
            request.session.testId = data[0].testId;
            var testId = data[0].testId;
            if (level == 'easy') {
                console.log("setQuiz");
                request.session.challenge.questions = data[0].easy;
            } else if (level == 'medium') {
                request.session.challenge.questions = data[0].medium;
            } else {
                request.session.challenge.questions = data[0].hard;
            }
            request.session.challenge.start = (new Date()).valueOf();
            request.session.challenge.questionsAnswered = [];
            request.session.challenge.currentQID = 1;
            response.send({
                "status": 200,
                "message": request.session.level
            })
        });
    });
};

exports.postAnswer = function (request, response) {
    var testId = request.params.testId;
    console.log(request.body);
    request.session.challenge.questionsAnswered.push(request.body);
    request.session.challenge.end = (new Date()).valueOf();
    console.log(request.session);
    response.send({
        "status": 200,
        "message": "successfully posted"
    })
};

exports.getNextQuestion = function (request, response) {
    var testId = request.session.testId;
    console.log("questions: \n\n\n\n");
    console.log(request.session.challenge);
    var question = request.session.challenge.questions[request.session.challenge.currentQID - 1];
    request.session.challenge.currentQID += 1;
    response.send({
        "status": 200,
        "questionId": request.session.challenge.currentQID - 1,
        "question": question
    });
};

exports.submitTest = function (request, response) {
    var qsBank = {};
    if (request.session.user != undefined)
        qsBank.username = request.session.user.email;
    else
        qsBank.username = "guest@illusion.com";
    qsBank.testId = request.session.testId;
    qsBank.time = (request.session.challenge.end - request.session.challenge.start) / 1000;
    qsBank.level = request.session.level;
    if (request.session.user != undefined)
        qsBank.School = request.session.user.School;
    else
        qsBank.School = "SJSU";
    qsBank.response = request.session.challenge.questionsAnswered;
    var count = 0;
    for (var i = 0; i < request.session.challenge.questionsAnswered.length; i++) {
        if (request.session.challenge.questionsAnswered[i].question.toString(2) == request.session.challenge.questionsAnswered[i].answer) {
            count++;
        }
    }
    qsBank.correctCount = count;
    mongo.connect(mongoURL, function () {
        var qsDetails = mongo.collection('resultDirectory');
        mongoDbHelper.insertIntoCollection(qsDetails, qsBank, function () {
            mongodb.MongoClient.connect('mongodb://localhost:27017/binaryGame', function (error, db) {
                if (error) {
                    response.send({
                        "Status": 500,
                        "Message": "Unable to save Ans"
                    });
                } else {
                    response.send({
                        "Status": 200,
                        "message": "Ans saved Successfully"
                    });
                }
            });
        });
    });
};




