import { Fragment, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { months } from '../../assets/months/months';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from '../../axios/axios';

const Lesson = ({ timeStamp, topic, link, _id, fetchUpcomingEvents }) => {
	const date = new Date(timeStamp);
	const [showEdit, setShowEdit] = useState(false);
	const inputRef = useRef();
	const [loading, setLoading] = useState(false);
	const [editData, setEditData] = useState({
		timeStamp,
		topic,
		link,
	});

	const deleteLesson = async () => {
		setLoading(true);
		try {
			await axios.delete(`/lessons/${_id}`);
		} catch (err) {
			console.log(err.message);
		} finally {
			fetchUpcomingEvents();
			setLoading(false);
		}
	};

	const editStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`/lessons/${_id}`, editData);
		} catch (err) {
			console.log(err.message);
		} finally {
			setShowEdit(!showEdit);
			fetchUpcomingEvents();
			setLoading(false);
		}
	};

	return (
		<Fragment>
			<div className="single-lesson">
				<div className="time">
					<h2>
						{months[date.getMonth()]} {date.getDate()}
					</h2>
					<p>
						{date.getHours() % 12 < 10
							? `0${date.getHours() % 12}`
							: date.getHours() % 12}
						:
						{date.getMinutes() < 10
							? `0${date.getMinutes()}`
							: date.getMinutes()}
						{date.getHours() < 12 ? ' AM' : ' PM'}
					</p>
				</div>
				<div className="title">
					<h2>{topic}</h2>
				</div>
				<div className="meeting-link">
					<a href={link} target="_blank" rel="noreferrer">
						Join here
					</a>
				</div>
				<div style={{ margin: '0px 3px' }} className="edit--btns">
					<button
						onClick={() => setShowEdit(!showEdit)}
						className="edit--button"
					>
						<EditIcon />
					</button>
					<button onClick={deleteLesson} className="delete--button">
						<DeleteOutlineIcon />
					</button>
				</div>
			</div>
			{showEdit && (
				<div className="edit-task">
					<form
						style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
						className="edit-task-form"
						onSubmit={editStudent}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
							}}
							className="edit-form-inputs"
						>
							<input
								style={{ width: '100%' }}
								type="text"
								placeholder="Topic"
								value={editData.topic}
								onChange={(e) =>
									setEditData({ ...editData, topic: e.target.value })
								}
								ref={inputRef}
							/>
							<input
								style={{ width: '100%' }}
								type="text"
								placeholder="Enter Link URL"
								value={editData.link}
								onChange={(e) =>
									setEditData({ ...editData, link: e.target.value })
								}
								ref={inputRef}
							/>
							<input
								style={{ width: '100%' }}
								type="date"
								value={editData.timeStamp}
								onChange={(e) =>
									setEditData({ ...editData, timeStamp: e.target.value })
								}
							/>
						</div>
						<button type="submit">save</button>
						<IoCloseOutline
							style={{ margin: '5px 0' }}
							onClick={(e) => setShowEdit(!showEdit)}
						/>
					</form>
				</div>
			)}
		</Fragment>
	);
};

export default Lesson;
