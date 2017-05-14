var express = require('express');
var router = express.Router();

var models = require('../models');
models.sequelize.sync();

var nodemailer = require('nodemailer');

const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(keySecret);

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./auth.js')

router.use(cookieParser())
router.use(session({
 secret: 'passport react',
  store: new SequelizeStore({
   db: models.sequelize
 }),
 resave: true,
 saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

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

router.get('/', function(req, res){
	if(req.session.passport){
		var data = {
			user: req.session.passport
		}
		res.render('mainpage', data);
	} else {
		res.render('mainpage');
	}
});

router.get('/contact', function(req, res){
	if(req.session.passport){
		var name = req.session.passport.user.name.split(" ");
		for(var i = 0; i < name.length; i++){
			name[i] = name[i].charAt(0).toUpperCase() + name[i].substring(1)
		}
		var data = {
			user: req.session.passport,
			name: name.join(" "),
			email: req.session.passport.user.email
		}
		res.render('contact', data);
	} else {
		res.render('contact');
	}
});

router.get('/list', function(req,res){
	models.Data.findAll({}).then(function(all){
		var arr = [];
		all.forEach(function(a){
			arr.push({
				name: a.first + " " + a.last,
				id: a.id
			});
		})
		res.json(arr);
	})
});

router.get('/data', function(req,res){
	res.render('data');
});

router.post('/datapost', function(req,res){
	models.Data.create({
		first: req.body.first,
		last: req.body.last,
		image: req.body.image
	}).then(function() {
		}).catch(function(err){
			throw err;
		});
});

router.get('/finder/:id', function(req,res){
	models.Data.findOne({where: {id: req.params.id}}).then(function(data){
		if(req.session.passport){
			var person = {
				id: data.id,
				name: data.first + " " + data.last,
				picture: data.image,
				user: req.session.passport
			}
			res.render('person', person)
		} else {
			var person = {
				id: data.id,
				name: data.first + " " + data.last,
				picture: data.image
			}
			res.render('person', person)			
		}
	});
})

router.get('/person/:id', function(req,res){
	models.Rock.findAll({where: {DatumId: req.params.id}}).then(function(rockers){
		var rocks = [];
		rockers.forEach(function(rocker){
			rocks.push(rocker)
		})
		res.json(rocks);
	});
})

router.post('/sendemail', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'cpsjtho@gmail.com',
			pass: process.env.MAIL_PASS
			}
	});
	var mailOptions = {
	    from: '"Monastir Society" <monastirsociety@yahoo.com>',
	    subject: 'Mainpage Contact Form',
	    to: 'jjthom87@yahoo.com',
	    message: 'Name: ' + req.body.name + '\n' + 'Email: ' + req.body.email + '\n' + 'Message: ' + req.body.message,
	    html: '<p> ' + 'Name: ' + req.body.name + '<br>' + 'Email: ' + req.body.email + '<br>' + 'Message: ' + req.body.message + ' </p>'
	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        res.json(error);
	    }
	    res.json(info);
	});
});

router.post("/donate", (req, res) => {
  stripe.customers.create({
     email: req.body.email,
    source: req.body.token
  }).then(customer =>
    stripe.charges.create({
      amount: req.body.amount * 100,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    })).then(charge => 
  		res.json(charge))
  	.catch(err =>
  		res.json(err))
});

router.post("/postMessage", (req, res) => {
  	models.Rock.create({
  		DatumId: req.body.id,
		poster: req.body.name,
		message: req.body.message,
	}).then(function() {
		}).catch(function(err){
			throw err;
		});
});

router.get('/logout', function(req, res){
  req.session.destroy(function(out){
    res.redirect('/');
  });
});

router.get('/stripeInfo', function(req, res){
	res.json(keyPublishable)
})

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/auth/google/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/contact'}))

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/contact'}));

module.exports = router;