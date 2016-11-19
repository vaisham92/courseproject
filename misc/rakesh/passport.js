var configAuth = require('./auth')

var passp = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passp) {
	passp.use(new FacebookStrategy({
    		clientID: configAuth.facebookAuth.clientID,
    		clientSecret: configAuth.facebookAuth.clientSecret,
    		callbackURL: configAuth.facebookAuth.callbackURL
  	},

  	function(accessToken, refreshToken, profile, done) {
    		User.findOrCreate(..., function(err, user) {
      		if (err) { return done(err); }
      		done(null, user);
    		});
  	}
	));

}

