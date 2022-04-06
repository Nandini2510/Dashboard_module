require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
app.use(cors());
app.use(express.json());

const courseRouter = require('./routes/courses');
const homeworkRouter = require('./routes/homeworks');
const leaderboardRouter = require('./routes/leaderboards');
const lessonRouter = require('./routes/lessons');
const taskRouter = require('./routes/tasks');

app.use('/courses', courseRouter);
app.use('/homeworks', homeworkRouter);
app.use('/leaderboards', leaderboardRouter);
app.use('/lessons', lessonRouter);
app.use('/tasks', taskRouter);

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }

app.listen(process.env.PORT || 8000, () => console.log('Server Started'));
