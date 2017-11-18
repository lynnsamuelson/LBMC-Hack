'use strict';

app.factory('uploadFactory', function ($q, $http) {

	//parses data from csv to Json, posts to db, called from uploadCtrl
	const uploadFile = (data) => {
		return $q((resolve, reject) => {
			let uploadObjStr = angular.toJson(data.data);
			let uploadObj = JSON.parse(uploadObjStr);
			// STILL NEEDS TO BE DONE -- add upload object to taggedUploadArrObj[1] and add csv file type to obj at taggedUploadArrObj[0]
			let taggedUploadArrObj = uploadObj;
			console.log("uploadObj", taggedUploadArrObj);
			uploadToApi(taggedUploadArrObj);

		});
	};


	function uploadToApi(arrObj){
		console.log("arrObj", arrObj);
		return $q((resolve, reject)=>{
			$http({
				method: 'POST',
				url: 'http://localhost:3000/uploadfile',
				// data: {"fake_json": "This is a small string."},
				data: arrObj,
				headers: {'Content-Type': 'application/json'}
			})
      .then((data) => {
        console.log("uploaded to Api?", data);
        resolve();
      })
      .catch( (err) => {
        reject(err);
      });
		});
	}
	// //send to API -- OPTION ONE
	// function uploadToApi(arrObj){
	// 	return $q((resolve, reject)=>{
	// 		$http.post(`http://localhost:3000/uploadfile/${arrObj}`)
 //      .then((data) => {
 //        console.log("uploaded to Api?", data);
 //        resolve();
 //      })
 //      .catch( (err) => {
 //        reject(err);
 //      });
	// 	});
	// }
	
	
	// //send to API -- OPTION TWO
	// function uploadToApi(arrObj){
	// 	return $q((resolve, reject)=>{
	// 		$http({
	// 			url: `http://localhost:3000/uploadfile/`,
	// 			method: "POST",
	// 			body: arrObj,
	// 			headers: {'Content-Type': 'application/json'}})
	// 			.then((data) => {
  //       console.log("uploaded to Api?", data);
  //       resolve();
  //     })
  //     .catch( (err) => {
  //       reject(err);
  //     });
	// 	});
	// }

	return {uploadFile};
});