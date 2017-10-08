'use strict';

app.controller('userAdminCtrl', function ($scope, userFactory) {

	$scope.allUsers = [];

	const getUsers = () => {
		userFactory.getAllUsers()
			.then(users => $scope.allUsers = users)
			.catch(error => console.log('error from getUsers', error));
	};

	getUsers();


});