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
			.then((userData) => {
				console.log("userData", userData);
				if (userData === null) {
					$scope.errorMessage = true;
				} else {
					$location.url('/home');
				}
			})
			.catch(error => console.log(error));
	};

	//logs out user, redirects to landing page
	$scope.logout = () => {
		userFactory.logoutUser();
	};

});