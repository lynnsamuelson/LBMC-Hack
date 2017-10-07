'use strict';

app.factory('uploadFactory', function ($q) {

	//parses data from csv to Json, posts to db, called from uploadCtrl
	const uploadFile = (data) => {
		return $q(() => {
			let uploadObj = angular.toJson(data.data);
			console.log("uploadObj", uploadObj);
		});
	};

	return {
		uploadFile
	};

});