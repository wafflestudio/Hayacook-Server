var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
	title: {type: String, required: true},
	thumb: {type: String},
	time: Number,
	difficulty: Number,
	trash: Number,
	essentialItems: [String],
	optionalItems: [String],
	cards: [],
	steps: []
});

module.exports = mongoose.model('Recipe', RecipeSchema);