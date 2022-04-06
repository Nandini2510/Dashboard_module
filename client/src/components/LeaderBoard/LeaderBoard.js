import { useState, useEffect, useContext } from 'react';
import Student from './Student.js';
import axios from '../../axios/axios';
import './LeaderBoard.css';
import { leaderData } from './LeaderData.js';
import { IoAdd, IoCloseOutline } from 'react-icons/io5';
import Loader from '../Loader/Loader.js';
// import UserContext from '../../context/authContext.js';

const LeaderBoard = () => {
	const [students, setStudents] = useState([]);
	const [showInput, setShowInput] = useState(false);
	const [loading, setLoading] = useState(true);
	// const { userDetails } = useContext(UserContext);
	const [name, setName] = useState('');
	const [profile, setProfile] = useState('');
	const [score, setScore] = useState('');

	const fetchLeadeboard = async () => {
		try {
			const { data } = await axios.get('/leaderboards');

			setStudents(data.sort((a, b) => b.score - a.score));
			setLoading(false);
		} catch (err) {
			console.log(err.message);
		}
	};

	const addLeaderBoard = async () => {
		setLoading(true);
		try {
			const leaderData = {
				name,
				profile,
				score,
			};
			await axios.post('/leaderboards', leaderData);
			fetchLeadeboard();
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLeadeboard();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="Leaderboard">
			<div className="leaderboard-header">
				<h2>LeaderBoard</h2>
				<button onClick={() => setShowInput(!showInput)}>
					{showInput ? <IoCloseOutline /> : <IoAdd />}
				</button>
			</div>
			{showInput && (
				<div className="add-newtask">
					<form onSubmit={addLeaderBoard}>
						<input
							type="text"
							placeholder="Student Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Enter profile image"
							value={profile}
							onChange={(e) => setProfile(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Enter Score"
							max={100}
							value={score}
							onChange={(e) => setScore(e.target.value)}
						/>

						<button type="submit">Add</button>
					</form>
				</div>
			)}
			<div className="leaderboard-main-div">
				<div className="title">
					<h2>Rank</h2>
					<h2>Name</h2>
					<h2>Points</h2>
				</div>
				{loading ? (
					<Loader />
				) : (
					<div className="leaderboard-students">
						{students?.map((student, index) => (
							<Student
								key={index}
								{...student}
								rank={index + 1}
								fetchLeadeboard={fetchLeadeboard}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default LeaderBoard;
