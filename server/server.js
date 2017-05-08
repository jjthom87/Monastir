//installing dependencies
require('dotenv').config();
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var routes = require('./controllers/route-controller.js')

// var models = require('./../models');
// models.sequelize.sync();

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
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'client/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname,'../client/views'));

app.use('/', routes);

//having the server listen to the port in order to communicate the front end with the back end
app.listen(PORT, function(){});