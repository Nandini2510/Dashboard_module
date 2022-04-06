import { useState, useEffect, useRef } from 'react';
import axios from '../../axios/axios';
import months from '../../assets/months/months';
import { IoCloseOutline } from 'react-icons/io5';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const SingleTasks = (props) => {
	const { _id, title, dueDate, isComplete, tasks, setTasks, user, fetchTasks } =
		props;
	const [isCompleted, setIsCompleted] = useState(isComplete);
	const [showEdit, setShowEdit] = useState(false);
	const [editTitle, setEditTitle] = useState(title);
	const [editDate, setEditDate] = useState(dueDate);
	const inputRef = useRef(null);

	const updateTask = async (e) => {
		e.preventDefault();
		try {
			const editedTask = {
				title: editTitle,
				dueDate: editDate,
				isComplete,
			};

			await axios.patch(`/tasks/${_id}`, editedTask);
			setShowEdit(!showEdit);
			fetchTasks();
		} catch (err) {
			console.log(err.message);
		}
	};

	const deleteTask = async () => {
		try {
			await axios.delete(`/tasks/${_id}`);
			fetchTasks();
		} catch (err) {
			console.log(err.message);
		}
	};

	const completeTodo = async () => {
		const completedTask = {
			_id,
			isComplete: !isComplete,
		};

		try {
			await axios.patch(`/tasks/${_id}`, completedTask);
			fetchTasks();
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (showEdit) inputRef.current.focus();
	}, [showEdit]);

	return (
		<div className="task-component">
			<div className="Task">
				<button className="check-btn" onClick={completeTodo}>
					{isComplete ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
				</button>
				<div className="task-title">
					<h3 style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
						{title}
					</h3>
					<p>
						Due Date: {dueDate.split('-')[2]}{' '}
						{dueDate.split('-')[1] < 10
							? months[dueDate.split('-')[1].split('')[1] - 1]
							: months[dueDate.split('-')[1]]}{' '}
						{dueDate.split('-')[0]}
					</p>
				</div>
				<button onClick={() => setShowEdit(!showEdit)} className="edit--button">
					<EditIcon />
				</button>
				<button onClick={deleteTask} className="delete--button">
					<DeleteOutlineIcon />
				</button>
			</div>
			{showEdit && (
				<div className="edit-task">
					<form className="edit-task-form" onSubmit={updateTask}>
						<div className="edit-form-inputs">
							<input
								type="text"
								placeholder="Add New Task"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								ref={inputRef}
							/>
							<input
								type="date"
								value={editDate}
								onChange={(e) => setEditDate(e.target.value)}
							/>
						</div>
						<button type="submit">save</button>
						<IoCloseOutline onClick={(e) => setShowEdit(!showEdit)} />
					</form>
				</div>
			)}
		</div>
	);
};

export default SingleTasks;
