'use strict';
app.controller('homeCtrl', function ($scope, purgeFactory, userFactory) {

	$scope.showPurge = false;
	$scope.showAdmin = false;

	$scope.purgeData = () => {
		console.log('purge data firing');
	};

	const checkForDataToPurge = () => {
		console.log('checking for data to purge');
		purgeFactory.checkDBForDataToPurge()
			.then(data => {
				if (data.length > 0) {
					$scope.showPurge = true;
				}
				console.log('data from check DB', data);
			})
			.catch(error => console.log('error from check DB', error));
	};

	const checkForAdmin = () => {
		userFactory.checkAdmin()
			.then(user => $scope.showAdmin = user)
			.catch(error => console.log('error from checkForAdmin', error));
	};

	checkForDataToPurge();
	checkForAdmin();

});