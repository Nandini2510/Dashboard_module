import { Fragment, useState } from 'react';
import { Avatar } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from '../../axios/axios';

const Student = (props) => {
	const { rank, name, profile, score, _id, fetchLeadeboard } = props;

	const [showEdit, setShowEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editData, setEditData] = useState({
		name,
		profile,
		score,
	});

	const deleteStudent = async () => {
		setLoading(true);
		try {
			await axios.delete(`/leaderboards/${_id}`);
		} catch (err) {
			console.log(err.message);
		} finally {
			fetchLeadeboard();
			setLoading(false);
		}
	};

	const editStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`/leaderboards/${_id}`, editData);
		} catch (err) {
			console.log(err.message);
		} finally {
			setShowEdit(!showEdit);
			fetchLeadeboard();
			setLoading(false);
		}
	};

	return (
		<Fragment>
			<div className="Student">
				<h3>{rank}</h3>
				<div className="name">
					<div className="leaderboard-profile">
						{!profile ? <Avatar /> : <Avatar src={profile} />}
					</div>
					<h3>{name}</h3>
				</div>
				<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
					<h3>{score}</h3>
					<div className="edit--btns">
						<button
							onClick={() => setShowEdit(!showEdit)}
							className="edit--button"
						>
							<EditIcon />
						</button>
						<button onClick={deleteStudent} className="delete--button">
							<DeleteOutlineIcon />
						</button>
					</div>
				</div>
			</div>
			{showEdit && (
				<div className="add-newtask">
					<form onSubmit={editStudent}>
						<input
							type="text"
							placeholder="Student Name"
							value={editData.name}
							onChange={(e) =>
								setEditData({ ...editData, name: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Enter profile image"
							value={editData.profile}
							onChange={(e) =>
								setEditData({ ...editData, profile: e.target.value })
							}
						/>
						<input
							type="number"
							placeholder="Enter Score"
							max={100}
							value={editData.score}
							onChange={(e) =>
								setEditData({ ...editData, score: e.target.value })
							}
						/>

						<button type="submit">Save</button>
					</form>
				</div>
			)}
		</Fragment>
	);
};

export default Student;
