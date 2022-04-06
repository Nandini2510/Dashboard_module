const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	isComplete: {
		type: Boolean,
		required: true,
		default: false,
	},
	dueDate: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('TodoSchema', todoSchema);
