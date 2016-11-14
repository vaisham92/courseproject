var configAuth = require('./auth')

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {
	passport.use(new FacebookStrategy({
    		clientID: '1722289798092382',
    		clientSecret: 'aec5235d637ee2d5f5a053434d925366',
    		callbackURL: "https://binarylearning.herokuapp.com//auth/facebook/callback"
  	},

  	function(accessToken, refreshToken, profile, done) {
    		User.findOrCreate(..., function(err, user) {
      		if (err) { return done(err); }
      		done(null, user);
    		});
  	}
	));

}

