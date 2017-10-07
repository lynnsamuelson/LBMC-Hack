'use strict';
app.controller('uploadCtrl', function ($scope, uploadFactory) {

	$scope.upload = () => {
		let file = document.getElementById('file').files[0];
		let reader = new FileReader();
		console.log('upload file and reader', file, reader);

		reader.readAsBinaryString(file);

		reader.onloadend = (event) => {
			let upload = event.target.result;

			console.log('upload', upload);

			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: (results) => {
					upload = results;
					uploadFactory.uploadFile(upload);
				}
			});

		};

	};

});


// $scope.add = function() {
//     var f = document.getElementById('file').files[0],
//         r = new FileReader();

//     r.onloadend = function(e) {
//       var data = e.target.result;
//       //send your binary data via $http or $resource or do anything else with it
//     }

//     r.readAsBinaryString(f);
// }


