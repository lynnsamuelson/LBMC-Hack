"use strict";

app.controller("resultsCtrl", function($scope, searchFactory){
  
  let scopedDataArrObj = searchFactory.searchResultsArray(); 

  $scope.arrayOfObj = scopedDataArrObj;
  console.log('IN CONTROLLER dataArrObj', scopedDataArrObj);
  
  $scope.detailFunction = function(event){
    let dbID = event.currentTarget.parentElement.parentElement.getAttribute("database-id");
    console.log('thang -- detail clicked', dbID);
    
    searchFactory.searchResultsDetail(dbID);
  };

  //sort List
  $scope.sort = function(keyname){
    $scope.sortKey = keyname;  //set the sortKey to parameter passed in
    $scope.reverse = !$scope.reverse;  //toggle true or false
  };

});