const express = require('express');
const router = express.Router();
const Lesson = require('../models/lesson');

// Getting all
router.get('/', async (req, res) => {
	try {
		const lessons = await Lesson.find();
		res.json(lessons);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getLesson, (req, res) => {
	res.json(res.lesson);
});

// Creating one
router.post('/', async (req, res) => {
	const { topic, link, timeStamp } = req.body;
	const lesson = new Lesson({
		topic,
		link,
		timeStamp,
	});
	try {
		const newLesson = await lesson.save();
		res.status(201).json(newLesson);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getLesson, async (req, res) => {
	const { topic, link, timeStamp } = req.body;
	if (topic != null) {
		res.lesson.topic = topic;
	}
	if (link != null) {
		res.lesson.link = link;
	}
	if (timeStamp != null) {
		res.lesson.timeStamp = timeStamp;
	}

	try {
		const updatedLesson = await res.lesson.save();
		res.json(updatedLesson);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getLesson, async (req, res) => {
	try {
		await res.lesson.remove();
		res.json({ message: 'Deleted Lesson' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getLesson(req, res, next) {
	let lesson;
	try {
		lesson = await Lesson.findById(req.params.id);
		if (lesson == null) {
			return res.status(404).json({ message: 'Cannot find Lesson' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.lesson = lesson;
	next();
}

module.exports = router;
