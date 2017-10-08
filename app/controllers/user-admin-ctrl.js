'use strict';

app.controller('userAdminCtrl', function ($scope, $location, userFactory) {

	$scope.allUsers = [];

	$scope.addUser = () => {
		console.log('firing');
		$location.url('/user-add');
	};

	$scope.editUser = (userId) => {

	};

	$scope.deleteUser = (userId) => {

	};

	const getUsers = () => {
		userFactory.getAllUsers()
			.then(users => $scope.allUsers = users)
			.catch(error => console.log('error from getUsers', error));
	};

	getUsers();


});