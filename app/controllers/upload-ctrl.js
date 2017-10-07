'use strict';
app.controller('uploadCtrl', function ($scope, uploadFactory) {

	//handler to upload CSV file
	$scope.upload = () => {
		//gets file data from input[type="file"]
		let file = document.getElementById('file').files[0];

		//parses csv to json, sends to upLoadFactory to post
		Papa.parse(file, {
			header: true,
			dynamicTyping: true,
			complete: (results) => {
				let upload = results;
				uploadFactory.uploadFile(upload);
			}
		});
	};
});