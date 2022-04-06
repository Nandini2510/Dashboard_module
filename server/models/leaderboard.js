const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	profile: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('LeaderSchema', leaderSchema);
