var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	id: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	category: {type: [String], default: []},
	channel: {type: [String], default: []},
	isAdmin: {type: Boolean, default: false},
	regDate: {type: Date, default: Date.now()}
});

UserSchema.pre('save', function (callback) {
	var user = this;

	if (user.id.replace(/[a-z0-9]{3,32}/i, '') !== '')
		return callback(new Error("ID rule violated"));

	if (!user.isModified('password')) return callback();

	bcrypt.hash(user.password, 4, function (err, hash) {
		if (err) return callback(err);

		user.password = hash;
		callback();
	});
});

UserSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);