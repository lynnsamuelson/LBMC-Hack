'use strict';
app.controller('userCtrl', function ($scope, $location, userFactory) {

	$scope.user = {
		email: '',
		password: ''
	};

	$scope.login = () => {
		userFactory.loginUser($scope.user)
			.then(() => $location.url('/home'))
			.catch(error => console.log(error));
	};

	$scope.logout = () => {
		userFactory.logoutUser();
	};

});