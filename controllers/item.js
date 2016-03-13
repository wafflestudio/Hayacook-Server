var Item = require('../models/item');

exports.create = function (req, res) {
	Item.create({
		id: req.body.id,
		name: req.body.name,
		category: req.body.category
	}).then(function (data) {
		res.json(data);
	}, function (err) {
		res.send(err);
	});
};

