import { useState, useEffect, useRef, useContext } from 'react';
import Loader from '../Loader/Loader';
import Lesson from './Lesson';
import axios from '../../axios/axios';
import './UpcomingLessons.css';
import { lessonData } from './LessonData';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';
//import UserContext from '../../context/authContext';

const UpcomingLessons = ({ user }) => {
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [topic, setTopic] = useState('');
	const [link, setLink] = useState('');
	const [timeStamp, setTimeStamp] = useState('');
	//const { userDetails } = useContext(UserContext);

	const addLesson = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const lessonData = {
			topic,
			link,
			timeStamp,
		};
		try {
			const { data } = await axios.post('/lessons', lessonData);

			fetchUpcomingEvents();
			setShowInput(false);
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const fetchUpcomingEvents = async () => {
		try {
			const { data } = await axios.get(`/lessons`);

			const sortedData = data
				.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
				.reverse();

			setUpcomingEvents(sortedData);
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// let isUnmounted = false;

		fetchUpcomingEvents();
	}, []);

	return (
		<div className="UpcomingLessons">
			<div className="lesson-header">
				<h2>Upcoming Lectures</h2>
				<button onClick={() => setShowInput(!showInput)}>
					{showInput ? <IoCloseOutline /> : <IoAdd />}
				</button>
			</div>
			{showInput && (
				<div className="add-newtask">
					<form onSubmit={addLesson}>
						<input
							type="text"
							placeholder="Topic"
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Enter link URL"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<input
							type="date"
							value={timeStamp}
							onChange={(e) => setTimeStamp(e.target.value)}
						/>

						<button type="submit">Add</button>
					</form>
				</div>
			)}
			{isLoading && <Loader />}
			<div className="lesson">
				{upcomingEvents?.map((event) => (
					<Lesson
						key={event._id}
						{...event}
						fetchUpcomingEvents={fetchUpcomingEvents}
					/>
				))}
			</div>
		</div>
	);
};

export default UpcomingLessons;
