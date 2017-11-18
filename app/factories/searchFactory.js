"use strict";

app.factory("searchFactory", function($q, $http, $location){
  let holdResultArrObj = [];
  let singleObj = {};

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
      searchMessagesById(searchObj) // switch two
      .then((resultsArrObj)=>{
        console.log('in first promise - factory', resultsArrObj);
        holdResultArrObj = resultsArrObj;
        $location.url("/results");
      });
     });
  }

  function searchMessagesById(searchObj) { // switch two
    let contactId = searchObj.searchContactID;
    console.log("contact id?", contactId);
    return $q( (resolve, reject) => {
      $http.get(`http://localhost:3000/messages/${contactId}`)
      .then( (data) => {
        console.log("records for that student:", data);
        let resultsArrObj = data.data;
        resolve(resultsArrObj);
      })
      .catch( (err) => {
        reject(err);
      });
    });
  }


  function searchResultsArray(){  // switch two
    return holdResultArrObj;
  }

  function searchResultsDetail(uniqueMessageID) {
    holdResultArrObj.forEach((obj)=>{
      if (obj.message_id == uniqueMessageID){
        singleObj = obj;
        $location.url('/details');
      }
    });

  }
  function ReturnSingleObj(){
    return singleObj;
  }

  
  return {searchAPI, searchResultsArray, searchResultsDetail, ReturnSingleObj};
});