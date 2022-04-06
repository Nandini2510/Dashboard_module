const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Getting all
router.get('/', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getTask, (req, res) => {
	res.json(res.task);
});

// Creating one
router.post('/', async (req, res) => {
	const { title, isComplete, dueDate } = req.body;
	const task = new Task({
		title,
		isComplete,
		dueDate,
	});
	try {
		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getTask, async (req, res) => {
	const { title, dueDate, isComplete } = req.body;
	if (title != null) {
		res.task.title = title;
	}
	if (isComplete != null) {
		res.task.isComplete = isComplete;
	}
	if (dueDate != null) {
		res.task.dueDate = dueDate;
	}

	try {
		const updatedTask = await res.task.save();
		res.json(updatedTask);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getTask, async (req, res) => {
	try {
		await res.task.remove();
		res.json({ message: 'Deleted Task' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getTask(req, res, next) {
	let task;
	try {
		task = await Task.findById(req.params.id);
		if (task == null) {
			return res.status(404).json({ message: 'Cannot find Task' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.task = task;
	next();
}

module.exports = router;
