import { Avatar } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import months from '../../assets/months/months';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from '../../axios/axios';

const Course = (props) => {
	const {
		_id,
		course_name,
		course_image,
		date_of_enrollment,
		author,
		author_picture,
		course_description,
		percentage_completed,
		fetchCourses,
	} = props;

	const [showEdit, setShowEdit] = useState(false);
	const [editData, seteditData] = useState({
		course_name,
		course_image,
		date_of_enrollment,
		author,
		author_picture,
		course_description,
		percentage_completed,
	});
	const [loading, setLoading] = useState(false);

	const deleteTask = async () => {
		setLoading(true);
		try {
			await axios.delete(`/courses/${_id}`);
		} catch (err) {
			console.log(err.message);
		} finally {
			fetchCourses();
			setLoading(false);
		}
	};

	const editCourse = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`/courses/${_id}`, editData);
		} catch (err) {
			console.log(err.message);
		} finally {
			setShowEdit(!showEdit);
			fetchCourses();
			setLoading(false);
		}
	};

	return (
		<div className="Course">
			<div className="course-heading">
				<img src={course_image} alt={course_name} />
				<div>
					<h2>{course_name}</h2>
					<div className="enrolled-on">
						<h3>
							Enrolled on: {date_of_enrollment?.split('-')[2]}{' '}
							{date_of_enrollment?.split('-')[1] < 10
								? months[date_of_enrollment?.split('-')[1].split('')[1]]
								: months[date_of_enrollment?.split('-')[1]]}{' '}
							{date_of_enrollment?.split('-')[0]}
						</h3>
					</div>
				</div>
			</div>
			<div className="instructor">
				<p>by</p>
				{author_picture ? <Avatar src={author_picture} /> : <Avatar />}
				<h3>{author}</h3>
			</div>
			<div className="course-description">
				<p>{course_description}</p>
			</div>
			<div className="course-progress">
				<h3>Progress</h3>
				<div>
					<progress value={percentage_completed} max={100} />
				</div>
				<h3>{percentage_completed}%</h3>
			</div>
			<div className="edit--btns">
				<button onClick={() => setShowEdit(!showEdit)} className="edit--button">
					<EditIcon />
				</button>
				<button onClick={deleteTask} className="delete--button">
					<DeleteOutlineIcon />
				</button>
			</div>
			{showEdit && (
				<div className="add-newtask">
					<form onSubmit={editCourse}>
						<input
							type="text"
							placeholder="Course Name"
							value={editData.course_name}
							onChange={(e) =>
								seteditData({
									...editData,
									course_name: e.target.value,
								})
							}
						/>
						<input
							type="text"
							placeholder="Course image"
							value={editData.course_image}
							onChange={(e) =>
								seteditData({
									...editData,
									course_image: e.target.value,
								})
							}
						/>
						<input
							type="text"
							placeholder="Author"
							value={editData.author}
							onChange={(e) =>
								seteditData({
									...editData,
									author: e.target.value,
								})
							}
						/>
						<input
							type="text"
							placeholder="Author Picture"
							value={editData.author_picture}
							onChange={(e) =>
								seteditData({
									...editData,
									author_picture: e.target.value,
								})
							}
						/>
						<input
							type="text"
							placeholder="Course Description"
							value={editData.course_description}
							onChange={(e) =>
								seteditData({
									...editData,
									course_description: e.target.value,
								})
							}
						/>
						<input
							type="number"
							placeholder="Percentage Completed"
							max={100}
							value={editData.percentage_completed}
							onChange={(e) =>
								seteditData({
									...editData,
									percentage_completed: e.target.value,
								})
							}
						/>
						<input
							type="date"
							placeholder="date of enrollment"
							value={editData.date_of_enrollment}
							onChange={(e) =>
								seteditData({
									...editData,
									date_of_enrollment: e.target.value,
								})
							}
						/>

						<button type="submit">Save</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Course;
