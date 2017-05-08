var express = require('express');
var router = express.Router();

var models = require('../models');
models.sequelize.sync();

var nodemailer = require('nodemailer');

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

//setting up get route for items displayed on main page
router.get('/', function(req, res){
	res.render('mainpage');
});

router.get('/contact', function(req, res){
	res.render('contact');
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
		var person = {
			name: data.first + " " + data.last,
			picture: data.image,
			publishKey: keyPublishable
		}
		res.render('person', person)
	});
})

router.get('/person/:id', function(req,res){
	models.Data.findOne({where: {id: req.params.id}}).then(function(data){
		res.json(data.id)
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
  let amount = req.body.amount * 100;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => 
  	res.redirect('/'))
  .catch(err =>
  	alert(err))
});

module.exports = router;