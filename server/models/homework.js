const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: true,
	},
	progress: {
		type: Number,
		required: true,
		default: 0,
		max: 100,
	},
});

module.exports = mongoose.model('HomeworkSchema', homeworkSchema);
