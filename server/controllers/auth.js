module.exports = {
	'googleAuth': {
		'clientID': process.env.GOOGLE_CLIENT_ID || 'id',
		'clientSecret': process.env.GOOGLE_CLIENT_SECRET || 'secret',
		'callbackURL': process.env.GOOGLE_CLIENT_CALLBACK_URL || '/auth/google/callback'
	},
	'facebookAuth': {
		'clientID': process.env.FACEBOOK_APP_ID || 'id',
		'clientSecret': process.env.FACEBOOK_APP_SECRET || 'secret',
		'callbackURL': process.env.FACEBOOK_CLIENT_CALLBACK_URL || '/auth/facebook/callback'
	}
}