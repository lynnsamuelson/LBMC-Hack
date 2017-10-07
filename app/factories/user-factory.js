'use strict';

app.factory('userFactory', function($location, $q) {

	//store current user id information
	let currentUser = null;

	//temporary username and password for testing
	let email = 'example@example.com',
	password = '123456';

	const loginUser = (user) => {
		return $q((resolve, reject) => {
			if (user.email === email && user.password === password) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	};

	const logoutUser = () => {
		currentUser = null;
		$location.url('/');
	};

	const checkAuthenticated = () => {

	};

	return {
		loginUser,
		logoutUser,
		checkAuthenticated
	};

});