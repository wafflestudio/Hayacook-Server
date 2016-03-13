var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	id: {type: String, required: true, unique: true},
	name: {type: [String], required: true},
	category: {type: String}
});

module.exports = mongoose.model('Item', ItemSchema);