var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var User = require('../models/user');

passport.use('verify-user', new BasicStrategy(function (id, password, callback) {
	User.findOne({id: id}, function (err, user) {
		if (err) return callback(err);
		if (!user) return callback(null, false);

		user.verifyPassword(password, function (err, isMatch) {
			if (err) return callback(err);
			if (!isMatch) return callback(null, false);
			return callback(null, user);
		});
	});
}));

passport.use('verify-admin', new BasicStrategy(function (id, password, callback) {
	User.findOne({id: id}, function (err, user) {
		if (err) return callback(err);
		if (!user || !user.isAdmin) return callback(null, false);

		user.verifyPassword(password, function (err, isMatch) {
			if (err) return callback(err);
			if (!isMatch) return callback(null, false);
			return callback(null, user);
		});
	});
}));

exports.verify = passport.authenticate('verify-user', {session: false});
exports.verifyAdmin = passport.authenticate('verify-admin', {session: false});