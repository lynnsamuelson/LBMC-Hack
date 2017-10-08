'use strict';

app.controller('userAddCtrl', function ($scope, userFactory) {

	$scope.title = "Add New User";

	$scope.user = {
		firstName: '',
		lastName: '',
		email: '',
		admin: ''

	};

	$scope.addEditUser = () => {
		userFactory.addUser($scope.user)
			.then()
			.catch();
	};
});