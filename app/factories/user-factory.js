'use strict';

app.factory('userFactory', function($location, $q) {

	//store current user id information
	let currentUser = null;

	//temporary username and password for testing
	let email = 'example@example.com',
	password = '123456';

	//checks checks login input against temp username and password, resolves true or false
	const loginUser = (user) => {
		return $q((resolve, reject) => {
			if (user.email === email && user.password === password) {
				currentUser = 'example';
				resolve(true);
			} else {
				resolve(false);
			}
		});
	};

	//resets current user to null, redirects to landing page
	const logoutUser = () => {
		currentUser = null;
		$location.url('/');
	};

	//checks for value in currentUser, resolves true or false
	const checkAuthenticated = () => {
		return new Promise((resolve, reject) => {
			if (currentUser === 'example') {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	};

	//returns current user
	const getCurrentUser = () => {
		return currentUser;
	};

	return {
		loginUser,
		logoutUser,
		checkAuthenticated,
		getCurrentUser
	};

});