'use strict';
app.controller('purgeCtrl', function ($scope, purgeFactory) {

	$scope.showPurge = false;

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

	checkForDataToPurge();

});