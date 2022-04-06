const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	sno: {
		type: Number,
		required: true,
	},
	course_name: {
		type: String,
		required: true,
	},
	course_image: {
		type: String,
		required: true,
	},
	course_description: {
		type: String,
		required: true,
	},
	date_of_enrollment: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	author: {
		type: String,
		required: true,
	},
	author_picture: {
		type: String,
		required: true,
	},
	percentage_completed: {
		type: Number,
		required: true,
		max: 100,
	},
});

module.exports = mongoose.model('CourseSchema', courseSchema);
