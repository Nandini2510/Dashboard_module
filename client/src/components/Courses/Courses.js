import { useState, useEffect, useRef, useContext } from 'react';
import Course from './Course';
import Loader from '../Loader/Loader';
import axios from '../../axios/axios';
import './Courses.css';
import { courseData } from './courseData';
import { IoAdd, IoCloseOutline, IoWarningOutline } from 'react-icons/io5';
//import UserContext from '../../context/authContext';

const Courses = ({ user }) => {
	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showInput, setShowInput] = useState(false);
	const [courseData, setCourseData] = useState({
		course_name: '',
		course_image: '',
		course_description: '',
		date_of_enrollment: '',
		author: '',
		author_picture: '',
		percentage_completed: '',
	});
	const mountedRef = useRef(true);
	//const { userDetails } = useContext(UserContext);

	const fetchCourses = async () => {
		try {
			const { data } = await axios.get(`/courses`);

			const courseData = data.filter((course, index) => index < 2);
			setCourses(courseData);
			setIsLoading(false);
		} catch (err) {
			console.log(err.message);
		}
		setIsLoading(false);
	};

	const addNewCourse = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await axios.post('/courses', courseData);
			fetchCourses();
			setShowInput(false);
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// let isUnmounted = false;

		fetchCourses();
	}, []);

	return (
		<div className="Courses">
			<div>
				<div className="course-header">
					<h2>My Courses</h2>
					<button onClick={() => setShowInput(!showInput)}>
						{showInput ? <IoCloseOutline /> : <IoAdd />}
					</button>
				</div>
			</div>

			{isLoading ? (
				<Loader />
			) : (
				<>
					{showInput && (
						<div className="add-newtask">
							<form onSubmit={addNewCourse}>
								<input
									type="text"
									placeholder="Course Name"
									value={courseData.course_name}
									onChange={(e) =>
										setCourseData({
											...courseData,
											course_name: e.target.value,
										})
									}
								/>
								<input
									type="text"
									placeholder="Course image"
									value={courseData.course_image}
									onChange={(e) =>
										setCourseData({
											...courseData,
											course_image: e.target.value,
										})
									}
								/>
								<input
									type="text"
									placeholder="Author"
									value={courseData.author}
									onChange={(e) =>
										setCourseData({
											...courseData,
											author: e.target.value,
										})
									}
								/>
								<input
									type="text"
									placeholder="Author Picture"
									value={courseData.author_picture}
									onChange={(e) =>
										setCourseData({
											...courseData,
											author_picture: e.target.value,
										})
									}
								/>
								<input
									type="text"
									placeholder="Course Description"
									value={courseData.course_description}
									onChange={(e) =>
										setCourseData({
											...courseData,
											course_description: e.target.value,
										})
									}
								/>
								<input
									type="number"
									placeholder="Percentage Completed"
									max={100}
									value={courseData.percentage_completed}
									onChange={(e) =>
										setCourseData({
											...courseData,
											percentage_completed: e.target.value,
										})
									}
								/>
								<input
									type="date"
									placeholder="date of enrollment"
									value={courseData.date_of_enrollment}
									onChange={(e) =>
										setCourseData({
											...courseData,
											date_of_enrollment: e.target.value,
										})
									}
								/>

								<button type="submit">Add</button>
							</form>
						</div>
					)}
					{isLoading ? (
						<Loader />
					) : (
						<div className="course-cards">
							{courses?.map((course) => (
								<Course
									key={course._id}
									{...course}
									fetchCourses={fetchCourses}
								/>
							))}
						</div>
					)}

					<button className="all-courses-btn">See all</button>
				</>
			)}
		</div>
	);
};

export default Courses;
