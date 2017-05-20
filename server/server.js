//installing dependencies
require('dotenv').config();
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var models = require('./models');
models.sequelize.sync();

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var flash = require('connect-flash');

var nodemailer = require('nodemailer');

const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(keySecret);

var app = express();

var PORT = process.env.PORT || 8000;

require('./controllers/passport.js')(passport);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ 
	limit: '50mb',
	extended: true, 
	parameterLimit:50000}));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/static', express.static('client'));

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: 'client/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname,'../client/views'));

app.use(cookieParser())
app.use(session({
	secret: 'monastirsociety',
	store: new SequelizeStore({
		db: models.sequelize
 	}),
 	resave: true,
 	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./controllers/route-controller.js')(app,passport,nodemailer,stripe,keyPublishable);

app.listen(PORT);