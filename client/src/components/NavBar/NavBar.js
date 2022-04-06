import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import Avatar from '@material-ui/core/Avatar';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
// import UserDetail from './userDetail';
// import Notification from './Notification';
import logo from '../../assets/images/logo.png';
import './NavBar.css';
//import UserContext from '../../context/authContext';

const getNotificationsFromLocalStorage = () => {
	const nots = localStorage.getItem('notifications');
	if (nots) {
		return JSON.parse(nots);
	} else {
		return null;
	}
};

const NavBar = () => {
	const [unseenCount, setUnseenCount] = useState(0);
	const [showUser, setShowUser] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [loading, setLoading] = useState(false);
	const [notifications, setNotifications] = useState(
		getNotificationsFromLocalStorage,
	);
	// const { userDetails, userProfilePic } = useContext(UserContext);

	const location = useLocation();
	const history = useNavigate();

	const showNotificationBar = async () => {
		setShowNotification(true);
		setShowUser(false);
		try {
			// const config = {
			// 	headers: { Authorization: `Bearer ${userDetails.key}` },
			// };
			// await axios.post(
			// 	'/api/notifSeen',
			// 	{
			// 		user: userDetails?.user?.pk,
			// 	},
			// 	config,
			// );
		} catch (err) {
			console.log(err.message);
		}
	};

	const showUserBar = () => {
		setShowUser(!showUser);
		setShowNotification(false);
	};

	useEffect(() => {
		const fetchNotifications = async () => {
			if (!notifications) {
				setLoading(true);
			}
			try {
				// const config = {
				// 	headers: { Authorization: `Bearer ${userDetails.key}` },
				// };
				// const { data } = await axios.get(
				// 	`/api/fetchNotification/${userDetails?.user?.username}`,
				// 	config,
				// );
				//setNotifications(data);
				setLoading(false);
				//localStorage.setItem('notifications', JSON.stringify(data));
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchNotifications();

		// if (Array.isArray(notifications)) {
		//   unseenNotifications?.length > 0
		//     ? setUnseenCount(unseenNotifications?.length)
		//     : setUnseenCount(0);
		//   const unseenNotifications = notifications?.filter(
		//     (notif) => !notif?.is_seen.includes(userDetails?.user?.pk)
		//   );
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{location.pathname !== '/' ? (
				<div className="navbar">
					<div className="logo">
						<img src={logo} alt="logo" />
					</div>
					<div className="user">
						<button id="notification" onClick={showNotificationBar}>
							{unseenCount > 0 && <span>{unseenCount}</span>}
							<NotificationsOutlinedIcon />
						</button>
						<h4 id="user-name">Nandini</h4>

						<Avatar src="" />
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default NavBar;
