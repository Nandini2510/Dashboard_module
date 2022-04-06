const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
	topic: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	timeStamp: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('LessonSchema', lessonSchema);
