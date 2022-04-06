const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboard');

// Getting all
router.get('/', async (req, res) => {
	try {
		const leaders = await Leaderboard.find();
		res.json(leaders);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getLeader, (req, res) => {
	res.json(res.leader);
});

// Creating one
router.post('/', async (req, res) => {
	const { name, profile, score } = req.body;
	const leader = new Leaderboard({
		name,
		profile,
		score,
	});
	try {
		const newLeader = await leader.save();
		res.status(201).json(newLeader);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getLeader, async (req, res) => {
	const { name, profile, score } = req.body;
	if (name != null) {
		res.leader.name = name;
	}
	if (profile != null) {
		res.leader.profile = profile;
	}
	if (score != null) {
		res.leader.score = score;
	}

	try {
		const updatedLeader = await res.leader.save();
		res.json(updatedLeader);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getLeader, async (req, res) => {
	try {
		await res.leader.remove();
		res.json({ message: 'Deleted leader' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getLeader(req, res, next) {
	let leader;
	try {
		leader = await Leaderboard.findById(req.params.id);
		if (leader == null) {
			return res.status(404).json({ message: 'Cannot find Student' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.leader = leader;
	next();
}

module.exports = router;
