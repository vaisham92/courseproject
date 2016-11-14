var configAuth = require('./auth')
	
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/user',
                                      failureRedirect: '/' }));
