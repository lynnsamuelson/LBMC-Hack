'use strict';

app.factory('userFactory', function($location, $q, $http) {

	//store current user id information
	let currentUser = null;

	//temporary database url for getting users collection
	let url = '../data/user-list.json';

	//checks checks login input against temp username and password, resolves true or false
	const loginUser = (user) => {
		return $q((resolve, reject) => {
			$http.get(url)
				.then(userList => {
					userList.data.forEach(item => {
						if (item.email === user.email && item.password === user.password) {
							currentUser = item;
							resolve(item);
						}
						resolve(null);
					});
				})
				.catch(error => reject(error));
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