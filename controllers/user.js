var User = require('../models/user');

exports.create = function (req, res) {
	var user = new User();
	user.id = req.body.id;
	user.password = req.body.password;
	user.name = req.body.name;

	user.save(function (err, data) {
		if (err) res.send(err);
		else res.json(data);
	});
};

exports.read = function (req, res) {
	User.find(req.body, function (err, data) {
		if (err) res.send(err);
		else res.json(data);
	});
};

exports.me = function (req, res) {
	var user = {
		name: req.user.name,
		id: req.user.id,
		regDate: req.user.regDate,
		category: req.user.category,
		channel: req.user.channel
	};
	res.json(user);
};