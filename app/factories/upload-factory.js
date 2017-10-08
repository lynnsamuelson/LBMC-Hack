'use strict';

app.factory('uploadFactory', function ($q) {

	//parses data from csv to Json, posts to db, called from uploadCtrl
	const uploadFile = (data) => {
		return $q(() => {
			let uploadObjStr = angular.toJson(data.data);
			let uploadObj = JSON.parse(uploadObjStr);
			

			console.log("uploadObj", uploadObj);
		});
	};

	return {
		uploadFile
	};

});