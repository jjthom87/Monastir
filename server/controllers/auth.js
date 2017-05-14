module.exports = {
	'googleAuth': {
		'clientID': process.env.GOOGLE_CLIENT_ID,
		'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
		'callbackURL': process.env.GOOGLE_CLIENT_CALLBACK_URL
	},
	'facebookAuth': {
		'clientID': process.env.FACEBOOK_APP_ID,
		'clientSecret': process.env.FACEBOOK_APP_SECRET,
		'callbackURL': process.env.FACEBOOK_CLIENT_CALLBACK_URL
	}
}