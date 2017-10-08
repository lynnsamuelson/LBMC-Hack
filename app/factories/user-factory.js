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
					});
					resolve(null);
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
			if (currentUser !== null) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	};

	//checks to see if user is an administrator, calls true or false from currentUser object
	const checkAdmin = () => {
		return new Promise((resolve, reject) => {
			resolve(currentUser.isAdmin);
		});
	};

	//returns current user
	const getCurrentUser = () => {
		return currentUser;
	};

	//returns all DB users
	const getAllUsers = () => {
		return $q((resolve, reject) => {
			$http.get(url)
				.then(users => resolve(users.data))
				.catch(error => console.log('error from getAllUsers', error));
		});
	};

	const addUser = (newUserObj) => {
		//final user post can be commented out when DB is ready, change temporary url
		// let newObj = angular.toJson(newUserObj);
		// return $http.post(url, newObj)
		// 	.then(success => success)
		// 	.catch(error => console.log('error from addUser', error));

		//delete this when db is ready
		return $q((resolve, reject) => {
			let newObj = angular.toJson(newUserObj);
			console.log('newObj', newObj);
		});
	};

	const editUser = (userObj) => {

	};

	const deleteUser = (userId) => {

	};

	return {
		loginUser,
		logoutUser,
		checkAuthenticated,
		checkAdmin,
		getCurrentUser,
		getAllUsers,
		addUser,
		editUser,
		deleteUser
	};

});