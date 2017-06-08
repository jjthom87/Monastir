var models = require('../models');

module.exports = function(app,passport,nodemailer,stripe,keyPublishable){

	app.get('/', function(req, res){
		if(req.session.passport){
			var data = {
				user: req.session.passport
			}
			res.render('mainpage', data);
		} else {
			res.render('mainpage');	
		}
	});

	app.get('/contact', function(req, res){
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

	app.get('/list', function(req,res){
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

	app.get('/data', function(req,res){
		res.render('data');
	});

	app.post('/datapost', function(req,res){
		models.Data.create({
			first: req.body.first,
			last: req.body.last,
			image: req.body.image
		}).then(function() {
			}).catch(function(err){
				throw err;
			});
	});

	app.get('/finder/:id', function(req,res){
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
	});

	app.get('/person/:id', function(req,res){
		models.Rock.findAll({where: {DatumId: req.params.id}}).then(function(rockers){
			var rocks = [];
			rockers.forEach(function(rocker){
				rocks.push(rocker)
			})
			if(req.session.passport){
				var data = {
					rocks: rocks,
					id: req.session.passport.user.id
				}
				res.json(data);
			} else {
				var data = {
					rocks: rocks
				}
				res.json(data);
			}
		});
	});

	app.post('/sendemail', function(req, res){
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

	app.post("/donate", (req, res) => {
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

	app.post("/postMessage", function(req, res){
	  	models.Rock.create({
			poster: req.body.poster,
			message: req.body.message,
			DatumId: req.body.id
		}).then(function(success){
				res.json(success)
			}).catch(function(err){
				res.json(err);
			});
	});

	app.get('/logout', function(req, res){
	  req.session.destroy(function(out){
	    res.redirect('/');
	  });
	});

	app.get('/stripeInfo', function(req, res){
		res.json(keyPublishable)
	});

	app.get('/stoneInfo', function(req, res){
		if(req.session.passport){
			res.json(req.session.passport)
		}
	});

	// app.post('/signin', function(req,res,next){
	//   passport.authenticate('local-signin', function(err, user, info){
	//     if (err) {
	//       return next(err);
	//     }
	//     if (!user) {
	//       return res.status(401).json({ success : false, message : 'authentication failed' });
	//     }
	//     req.login(user, function(err){
	//       if(err){
	//         return next(err);
	//       }
	//       return res.status(200).json({ success : true, message : 'authentication succeeded' });        
	//     });
	//   })(req, res, next);
	// });

	app.post('/signin', 
		passport.authenticate('local-signin', {
			successRedirect: '/',
			failureRedirect: '/',
			failureFlash: true
		})
	);

	app.post('/signup', 
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/',
			failureFlash: true
		})
	);

	app.get('/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', 
		passport.authenticate('google', {
			successRedirect: '/', 
			failureRedirect: '/contact'
		})
	);

	app.get('/auth/facebook', 
		passport.authenticate('facebook', {
			scope: ['email']
		})
	);

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {
			successRedirect: '/', 
			failureRedirect: '/contact'
		})
	);

	app.get('/api/data', function(req,res){
		models.Data.findAll().then(function(data){
			res.json(data)
		})
	})

}