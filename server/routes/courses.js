const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Getting all
router.get('/', async (req, res) => {
	try {
		const courses = await Course.find();
		res.json(courses);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get('/:id', getCourse, (req, res) => {
	res.json(res.course);
});

// Creating one
router.post('/', async (req, res) => {
	const {
		course_name,
		course_image,
		course_description,
		date_of_enrollment,
		author,
		author_picture,
		percentage_completed,
	} = req.body;
	const courses = await Course.find();
	const course = new Course({
		sno: courses.length + 1,
		course_name,
		course_image,
		course_description,
		date_of_enrollment,
		author,
		author_picture,
		percentage_completed,
	});
	try {
		const newCourse = await course.save();
		res.status(201).json(newCourse);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch('/:id', getCourse, async (req, res) => {
	const {
		course_name,
		course_image,
		course_description,
		date_of_enrollment,
		author,
		author_picture,
		percentage_completed,
	} = req.body;
	if (course_name != null) {
		res.course.course_name = course_name;
	}
	if (course_image != null) {
		res.course.course_image = course_image;
	}
	if (course_description != null) {
		res.course.course_description = course_description;
	}
	if (date_of_enrollment != null) {
		res.course.date_of_enrollment = date_of_enrollment;
	}
	if (author != null) {
		res.course.author = author;
	}
	if (author_picture != null) {
		res.course.author_picture = author_picture;
	}
	if (percentage_completed != null) {
		res.course.percentage_completed = percentage_completed;
	}

	try {
		const updatedCourse = await res.course.save();
		res.json(updatedCourse);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete('/:id', getCourse, async (req, res) => {
	try {
		await res.course.remove();
		res.json({ message: 'Deleted course' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getCourse(req, res, next) {
	let course;
	try {
		course = await Course.findById(req.params.id);
		if (course == null) {
			return res.status(404).json({ message: 'Cannot find course' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.course = course;
	next();
}

module.exports = router;
