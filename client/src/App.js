import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate as Redirect,
} from 'react-router-dom';
import { useContext } from 'react';

import DashBoard from './pages/Dashboard/DashBoard';

import ErrorPage from './pages/ErrorPage/ErrorPage';
import NavBar from './components/NavBar/NavBar';

import Login from './pages/LoginPage/Login';

const App = () => {
	//const { userDetails } = useContext(UserContext);

	return (
		<Router>
			<div className="App">
				{/* {userDetails && <NavBar />} */}
				<NavBar />
				<Routes>
					<Route
						path="/"
						// element={!userDetails ? <Login /> : <Redirect to="/dashboard"}
						element={<Login />}
					/>

					<Route
						path="/dashboard"
						// element={userDetails ? <DashBoard /> : <Redirect to="/login" />}
						element={<DashBoard />}
					/>

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
