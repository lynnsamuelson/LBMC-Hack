"use strict";

app.controller("resultsCtrl", function($scope, searchFactory){
  
  $scope.arrayOfObj = [{}];

  //sort List
  $scope.sort = function(keyname){
    $scope.sortKey = keyname;  //set the sortKey to parameter passed in
    $scope.reverse = !$scope.reverse;  //toggle true or false
  };

});