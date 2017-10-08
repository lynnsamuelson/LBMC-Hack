'use strict';
app.factory('purgeFactory', function ($q, $http) {

	let testDataUrl = '../data/dummy-data.json';

	let dataHolder = [];


	const checkDBForDataToPurge = () => {
		return $q((resolve, reject) => {
			$http.get(testDataUrl)
				.then((messages) => {
					dataHolder = messages.data;
					resolve(messages.data);
				})
				.catch(error => reject(error));
		});
	};

	const purgeDataFromDB = () => {

	};

	return {
		checkDBForDataToPurge,
		purgeDataFromDB
	};

});