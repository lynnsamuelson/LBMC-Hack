'use strict';

// function searchMessagesById(contactId) {
//     return $q( (resolve, reject) => {
//       $http.get(`http://localhost:3000/messages/${contactId}`)
//       .then( (data) => {
//         console.log("records for that student:", data)
//         resolve(data);
//       })
//       .catch( (err) => {
//         reject(err);
//       });
//     });
// }

// searchMessagesById("0036100000uHOWD");

// //here, we need the listener that gets the input from the search field, then in that function:
// if (contactID) {
//     searchEmailsById(contactID);
// } else if (relatedContactId) {
//     searchByRelId(relatedContactId);
//   } else if (emailAd) {
//     searchByEmailAd(emailAd);
//   } else {
//     //something to say "please input something we can use"
//   }

const handleFileSelect = (event) => {
    console.log("firing event", event);
    let file = event.target.files[0];
    let data;

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        step: (results) => {
            data = results;
            console.log('data?', data);
            prepData(data.data[0]);
        } 
    });
};



const runInsertToDB = (emailObj) => {
    db.run(`INSERT INTO email VALUES (null, 
    '${emailObj.clicked}', 
    '${emailObj.contact}', 
    '${emailObj.contactId}', 
    '${emailObj.contactRecordType}', 
    '${emailObj.dateBounced}', 
    '${emailObj.dateOpened}', 
    '${emailObj.dateSent}', 
    '${emailObj.dateUnsubscribed}', 
    '${emailObj.deleted}', 
    '${emailObj.email}', 
    '${emailObj.emailName}', 
    '${emailObj.fromAddress}', 
    '${emailObj.fromName}', 
    '${emailObj.hardBounce}', 
    ${emailObj.numberOfTotalClicks}, 
    ${emailObj.numberOfUniqueClicks}, 
    '${emailObj.opened}', 
    '${emailObj.relatedStudentContactId}', 
    '${emailObj.softBounce}', 
    '${emailObj.subjectLine}')`);
}

//BELOW are a vanillaJS and jQuery way to output the results to the DOM
// let div = document.getElementById('output-field');
// div.innerHTML = "WHAT UP";

// $(document).ready(() => {
//     $('#file-import').change(handleFileSelect);
// });