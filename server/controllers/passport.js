var models = require('../models');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./auth.js');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.serializeUser(function(user,done){
		done(null, user);
	});

	passport.deserializeUser(function(obj,done){
		done(null, obj);
	});

	passport.use('local-signin', new LocalStrategy({
		usernameField: 'sign-in-email',
		passwordField: 'sign-in-password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			models.User.findOne({where: {email: email}}).then(function(user){
				if(!user)
					return done(null, false, req.flash('loginMessage', 'No User found'));
		        if (!bcrypt.compareSync(password, user.get('password_hash'))){
		          return done(null, false, req.flash('incorrectPassword','incorrect password'));
		        }
				return done(null, user);
			});
		});
	}));

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			models.User.findOne({where: {email: email}}).then(function(user){
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
	  				return models.User.create({
	  					name: req.body.name,
	  					email: email,
	  					password: password
	  				}).then(function(newUser){
	  					return done(null, newUser)
						}).catch(function(err){
							console.error(err);
						});
				};
	  		});
	    });
	}));
	 
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