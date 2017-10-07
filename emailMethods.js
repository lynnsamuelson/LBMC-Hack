'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tnAchieves.sqlite');

//my fake objects, to be replaced by a ton of csv parsed ones
let csvEmailObjs = [
	{
		clicked: "N",
		contact: "Ame Plows",
		contactId: "0036100000uHOWD",
		contactRecordType: "student", 
		dateSent: "9/4/2017  1:04:00 PM", 
		deleted: "N", 
		email: "myaddress60979@email.net", 
		emailName: "Class of 2017 TM3 - One Week Student", 
		fromName: "Record Owner", 
		hardBounce: "N", 
		numberOfTotalClicks: 1, 
		numberOfUniqueClicks: 1, 
		opened: "Y", 
		softBounce: "N", 
		subjectLine: "You are a college student!"
	},
	{
		clicked: "N",
		contact: "Ame Plows",
		contactId: "0036100000uHOWD",
		contactRecordType: "student", 
		dateSent: "9/4/2017  1:04:00 PM", 
		deleted: "N", 
		email: "myaddress60979@email.net", 
		emailName: "Class of 2017 TM3 - One Week Student", 
		fromName: "Record Owner", 
		hardBounce: "N", 
		numberOfTotalClicks: 1, 
		numberOfUniqueClicks: 1, 
		opened: "Y", 
		softBounce: "N", 
		subjectLine: "You are a college student!"
	},
]
//Methods for the EMAIL data
//this will not need to be in the production version as the DB will already exist! Just for my build purposes -EL

db.serialize( () => {

    db.run(`DROP TABLE IF EXISTS email`);

	db.run(`CREATE TABLE IF NOT EXISTS email(
	    email_id INTEGER PRIMARY KEY NOT NULL,
	    clicked TEXT NOT NULL,
	    contact TEXT NOT NULL,
	    contactId TEXT NOT NULL, 
	    contactRecordType TEXT NOT NULL, 
	    dateBounced DATE, 
	    dateOpened DATE, 
	    dateSent DATE NOT NULL, 
	    dateUnsubscribed DATE, 
	    deleted TEXT NOT NULL, 
	    email TEXT NOT NULL, 
	    emailName TEXT NOT NULL, 
	    fromAddress TEXT, 
	    fromName TEXT NOT NULL, 
	    hardBounce TEXT NOT NULL, 
	    numberOfTotalClicks INTEGER NOT NULL, 
	    numberOfUniqueClicks INTEGER NOT NULL, 
	    opened TEXT NOT NULL, 
	    relatedStudentContactId TEXT, 
	    softBounce TEXT NOT NULL, 
	    subjectLine TEXT
	)`);



//POST from upload, iterate over each of the items in the parsed array of objects:
    csvEmailObjs.forEach( (emailObj) => {
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
    });
})
    //will this be able to do 'forEach' for so many?
    //will a promise.all evne hold this much?


//Needed methods: GET by contactId and by contact, also by relatedStudentContactId at the same time as the contactId search
//DELETE - when the record is 3 years old- GET all things that are three years old, then iterate over their IDs and delete them?