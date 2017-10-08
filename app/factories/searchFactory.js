"use strict";

app.factory("searchFactory", function($q, $http, $location){
  let holdResultArrObj = [];

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
      searchMessagesById(searchObj);
     });
  }
  
  function searchMessagesById(searchObj) {
    let contactId = searchObj.searchContactID;
    console.log("contact id?", contactId);
    return $q( (resolve, reject) => {
      $http.get(`http://localhost:3000/messages/${contactId}`)
      .then( (data) => {
        console.log("records for that student:", data);
        let resultsArrObj = data.data;
        searchResultsArray(resultsArrObj);
        resolve();
        $location.url("#!/results");
      })
      .catch( (err) => {
        reject(err);
      });
    });
}

function searchResultsArray(tempResultArrObj){
  holdResultArrObj = tempResultArrObj;
  return holdResultArrObj;
}

function searchResultsDetail(uniqueMessageID) {
  holdResultArrObj.forEach((obj)=>{
    // CHANGE obj.email_id TO WHATEVER THE UNIQUE ID WILL BE COMMING FROM DB
    if (obj.email_id === uniqueMessageID){
      return obj;
    }
  });

}

  
  return {searchAPI, searchResultsArray, searchResultsDetail};
});