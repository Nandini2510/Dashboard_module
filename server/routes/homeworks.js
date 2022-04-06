const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

// Getting all
router.get('/', async (req, res) => {
	try {
		const homeworks = await Homework.find();
		res.json(homeworks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getHomework, (req, res) => {
	res.json(res.homework);
});

// Creating one
router.post('/', async (req, res) => {
	const { subject, progress } = req.body;
	const homework = new Homework({
		subject,
		progress,
	});
	try {
		const newHomework = await homework.save();
		res.status(201).json(newHomework);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getHomework, async (req, res) => {
	const { subject, progress } = req.body;
	if (subject != null) {
		res.homework.subject = subject;
	}
	if (progress != null) {
		res.homework.progress = progress;
	}

	try {
		const updatedHomework = await res.homework.save();
		res.json(updatedHomework);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getHomework, async (req, res) => {
	try {
		await res.homework.remove();
		res.json({ message: 'Deleted Homework' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getHomework(req, res, next) {
	let homework;
	try {
		homework = await Homework.findById(req.params.id);
		if (homework == null) {
			return res.status(404).json({ message: 'Cannot find homework' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.homework = homework;
	next();
}

module.exports = router;
