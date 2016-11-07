
passport.use(new FacebookStrategy({
    clientID: "1722289798092382",
    clientSecret: "aec5235d637ee2d5f5a053434d925366",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
