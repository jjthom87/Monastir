var models = require('../models');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./auth.js');

module.exports = function(passport) {

	passport.serializeUser(function(user,done){
		done(null, user);
	});

	passport.deserializeUser(function(obj,done){
		done(null, obj);
	});
	 
	passport.use(new GoogleStrategy({
	    clientID: auth.googleAuth.clientID,
	    clientSecret: auth.googleAuth.clientSecret,
	    callbackURL: auth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done){
	  	process.nextTick(function(){
	  		models.User.findOne({ where: {googleID: profile.id}}).then(function(user){
	  			if(user){
	  				return done(null, user)
	  			} else {
	  				return models.User.create({
	  					googleID: profile.id,
	  					token: accessToken,
	  					name: profile.displayName,
	  					email: profile.emails[0].value
	  				}).then(function(newUser) {
	  					return done(null, newUser)
						}).catch(function(err){
							console.error(err);
						});
	  			}
	  		});
	    });
	}));

	passport.use(new FacebookStrategy({
	    clientID: auth.facebookAuth.clientID,
	    clientSecret: auth.facebookAuth.clientSecret,
	    callbackURL: auth.facebookAuth.callbackURL,
	    profileFields: ['id', 'emails', 'name']
	  },
	  function(accessToken, refreshToken, profile, done){
	  	process.nextTick(function(){
	  		models.User.findOne({ where: {facebookID: profile.id}}).then(function(user){
	  			if(user){
	  				return done(null, user)
	  			} else {
	  				return models.User.create({
	  					facebookID: profile.id,
	  					token: accessToken,
	  					name: profile.name.givenName + " " + profile.name.familyName,
	  					email: profile.emails[0].value
	  				}).then(function(newUser) {
	  					return done(null, newUser)
						}).catch(function(err){
							console.error(err);
						});
	  			}
	  		});
	    });
	}));

}