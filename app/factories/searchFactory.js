"use strict";

app.factory("searchFactory", function($q, $http, $location){
  function searchAPI(searchObjNotFormatted){
    return $q((resolve, reject)=>{
      //switch undefined to null  -- for ease of use in sql query 
      let searchObj = {};
      if (searchObjNotFormatted.searchContactID === undefined) {
        searchObj.searchContactID = null;
      } else {
        searchObj.searchContactID = searchObjNotFormatted.searchContactID;
      }
      if (searchObjNotFormatted.searchEmailAddr === undefined) {
        searchObj.searchEmailAddr = null;
      } else {
        searchObj.searchEmailAddr = searchObjNotFormatted.searchEmailAddr;
      }
      if (searchObjNotFormatted.searchRelContactID === undefined) {
        searchObj.searchRelContactID = null;
      } else {
        searchObj.searchRelContactID = searchObjNotFormatted.searchRelContactID;
      }
      console.log('searchObj in Factory', searchObj);

      // make call to Api using formatted Object -- searchObj
      // $http.get(`apiCall.url/${searchObj}`)
      // .then((data)=>{
      //   $location.url("#!/results");
      // });
     });
  }
  
  
  
  return {searchAPI};
});