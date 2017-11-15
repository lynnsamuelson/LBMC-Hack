"use strict";

app.controller("detailCtrl", function($scope, searchFactory){
  let singleObj = searchFactory.ReturnSingleObj();
  //check if single object is a text or email

  //turn keys & values into separate arrays
  let objArrKeyValues = [];
  console.log('singleObj', singleObj);
  
  Object.keys(singleObj).forEach(function (key) {
      objArrKeyValues.push(singleObj[key]);
  });
  
  let objArrKeyNames = [];
  for (let p in singleObj) {
    if( singleObj.hasOwnProperty(p) ) {
      objArrKeyNames.push(p);
    } 
  }
  console.log('objArrKeyNames', objArrKeyNames);
  
  console.log("objArrKeyValues", objArrKeyValues);

  $scope.objDetailKeyValues = objArrKeyValues;
  $scope.objDetailKeyNames = objArrKeyNames;
});