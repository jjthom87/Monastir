//installing dependencies
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');

var list = require('./../client/javascript/stone-list.js');

var models = require('./../models');

models.sequelize.sync();

//setting up express function
var app = express();

//port route for local host and heroku
var PORT = process.env.PORT || 8000;

//setting up bady parser for json objects
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json());

//getting static files(css, js)
app.use('/static', express.static('client'));

//setting up express-handlebars for the front end
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//setting up get route for items displayed on main page
app.get('/', function(req, res){
	res.render('mainpage');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.get('/list', function(req,res){
	res.json(list);
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
})

app.get('/finder/:id', function(req,res){
	for(var i = 0; i < list.length; i++){
		if(req.params.id == list[i].id){
			var data = {
				name: list[i].first_name + " " + list[i].last_name,
				picture: list[i].picture
			}
			res.render('person', data)
		}
	}
})

app.get('/person/:id', function(req,res){
	for(var i = 0; i < list.length; i++){
		if(req.params.id == list[i].id){
			var data = {
				id: list[i].id,
				name: list[i].first_name + " " + list[i].last_name,
			}
			res.json(data)
		}
	}
})

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

//having the server listen to the port in order to communicate the front end with the back end
app.listen(PORT, function(){});