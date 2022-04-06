import { useNavigate } from 'react-router-dom';
import errorImage from '../../assets/images/errorpage.svg';
import './ErrorPage.css';

const Enrollment = () => {
	const history = useNavigate();
	return (
		<div className="errorPage">
			<img src={errorImage} alt="404" />
			<h2>This page could not be found!</h2>
			<button onClick={() => history('/dashboard')}>Dashboard</button>
			This is error page
		</div>
	);
};

export default Enrollment;
