var Recipe = require('../models/recipe');

exports.create = function (req, res) {
	var recipe = new Recipe();

	// Copy every attribute
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			recipe[key] = req.body[key];
		}
	}

	recipe.save(function (err, result) {
		if (err) res.send(err);
		else res.json(result.data);
	});
};

exports.read = function (req, res) {
	Recipe.find({}, function (err, data) {
		if (err) res.send(err);
		else res.json(data);
	});
};