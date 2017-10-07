'use strict';

app.factory('uploadFactory', function ($q) {

	const uploadFile = (data) => {
		return $q(() => {
			console.log('data from uploadFile', data);
		});
	};

	return {
		uploadFile
	};

});