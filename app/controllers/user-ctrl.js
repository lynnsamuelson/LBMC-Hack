'use strict';
app.controller('userCtrl', function ($scope, $location, userFactory) {

	//displays error message if login is incorrect
	$scope.errorMessage = false;

	//holds user email and password from login input fields
	$scope.user = {
		email: '',
		password: ''
	};

	//pulls in email and password and fires loginUser, redirects is resolved
	$scope.login = () => {
		userFactory.loginUser($scope.user)
			.then((user) => {
				if (user) {
					$location.url('/home');
				} else {
					$scope.errorMessage = true;
				}
			})
			.catch(error => console.log(error));
	};

	//logs out user, redirects to landing page
	$scope.logout = () => {
		userFactory.logoutUser();
	};

});