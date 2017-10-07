'use strict';
app.controller('searchViewCtrl', function ($scope, $location, searchFactory) {
  function searchDB(searchObjNotFormatted){
    // send searchObjNotFormatted to Factory
    searchFactory.searchMessagesById("0036100000uHOWD");
    // searchFactory.searchAPI(searchObjNotFormatted);
  }

  $scope.searchFunct = function(keyEvent){
    if(keyEvent.which === 13){
      let searchObj = {};
      // get search input & build searchObj
      searchObj.searchContactID = $scope.searchInputContactID;
      searchObj.searchEmailAddr = $scope.searchInputEmailAddr;
      searchObj.searchRelContactID = $scope.searchInputRelContactID;
      // perform Search passing SearchObj
      searchDB(searchObj);
    } 
  };
});