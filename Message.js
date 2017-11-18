import { workers } from 'cluster';

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
		numberOfTotalClicks: 4, 
		numberOfUniqueClicks: 1, 
		opened: "Y", 
		softBounce: "N", 
		subjectLine: "Deadline Reminder"
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




let csvMessageObjs = [
	{
		clicked: "N",
		contact: "Ame Plows",
		contactId: "0036100000uHOWD",
		contactRecordType: "student",
		createdDate: "10-03-2016",
	    dateBounced: "12-4-2016", 
	    dateOpened: "10-14-2016", 
	    dateUnsubscribed: "10-14-2016", 
	    inboundNumber: "1 888 555 5556",
		dateSent: "9/4/2017  1:04:00 PM", 
		deleted: "N", 
		inboundNumber: "615 555 5599",
	    mobileNumber: "615 555 2234",
		email: "myaddress60979@email.net", 
		emailName: "Class of 2017 TM3 - One Week Student", 
		fromName: "Record Owner", 
		hardBounce: "N", 
		numberOfTotalClicks: 4, 
		numberOfUniqueClicks: 1, 
		opened: "Y", 
		softBounce: "N", 
		subjectLine: "Deadline Reminder",
		SMS: "SMS TEXT EXAMPLE",
	    campaign: "campaign",
	    deliveryStatus: "Delivered",
	    disableSMSOnTrigger: "N",
	    sentStatus: "Y"
	},
	{
		clicked: "N",
		contact: "Ame Plows",
		contactId: "0036100000uHOWD",
		contactRecordType: "student", 
		dateSent: "9/4/2017  1:04:00 PM", 
		createdDate: "08-03-2016",
	    dateBounced: "05-4-2016", 
	    dateOpened: "12-14-2016", 
	    dateUnsubscribed: "10-30-2016", 
	    inboundNumber: "1 888 555 5796",
		deleted: "N", 
		inboundNumber: "615 555 5599",
	    mobileNumber: "615 555 2234",
		email: "myaddress60979@email.net", 
		emailName: "Class of 2017 TM3 - One Week Student", 
		fromName: "Record Owner", 
		hardBounce: "N", 
		numberOfTotalClicks: 1, 
		numberOfUniqueClicks: 1, 
		opened: "Y", 
		softBounce: "N", 
		subjectLine: "You are a college student!",
		SMS: "SMS TEXT EXAMPLE",
	    campaign: "campaign",
	    deliveryStatus: "Delivered",
	    disableSMSOnTrigger: "N",
	    sentStatus: "Y"
	},
]
//Methods for the EMAIL data
// //this will not need to be in the production version as the DB will already exist! Just for my build purposes -EL

// db.serialize( () => {

// // // keeping these commented out pieces for generating the table for order reference -- in the INPUT stage, the order matters a lot

//     db.run(`DROP TABLE IF EXISTS EmailFiles`);

// 	db.run(`CREATE TABLE IF NOT EXISTS EmailFiles(
// 	    email_id INTEGER PRIMARY KEY NOT NULL,
// 	    clicked TEXT NOT NULL,
// 	    contact TEXT NOT NULL,
// 	    contactId TEXT NOT NULL, 
// 	    contactRecordType TEXT NOT NULL, 
// 	    dateBounced DATE, 
// 	    dateOpened DATE, 
// 	    dateSent DATE NOT NULL, 
// 	    dateUnsubscribed DATE, 
// 	    deleted TEXT NOT NULL, 
// 	    email TEXT NOT NULL, 
// 	    emailName TEXT NOT NULL, 
// 	    fromAddress TEXT, 
// 	    fromName TEXT NOT NULL, 
// 	    hardBounce TEXT NOT NULL, 
// 	    numberOfTotalClicks INTEGER NOT NULL, 
// 	    numberOfUniqueClicks INTEGER NOT NULL, 
// 	    opened TEXT NOT NULL, 
// 	    relatedStudentContactId TEXT, 
// 	    softBounce TEXT NOT NULL, 
// 	    subjectLine TEXT
// 	)`);


// module.exports.prepEmailData = (data) => {
//     console.log('printData firing', data["Contact Record Type"]);
//     data.forEach(d => {
//         let emailObj= {};

//            emailObj.clicked = d.Clicked;
//            emailObj.contact = d.Contact;
//            emailObj.contactId = d["Contact ID"];
//            emailObj.contactRecordType = d["Contact Record Type"];
//            emailObj.dateBounced = d["Date Bounced"];
//            emailObj.dateOpened = d["Date Opened"];
//            emailObj.dateSent = d["Date Sent"];
//            emailObj.dateUnsubscribed = ["Date Unsubscribed"];
//            emailObj.deleted = d.Deleted;
//            emailObj.email = d.Email;
//            emailObj.emailName = d["Email Name"];
//            emailObj.fromAddress = d["From Address"];
//            emailObj.fromName = d["From Name"];
//            emailObj.hardBounce = d["Hard Bounce"];
//            emailObj.numberOfTotalClicks = d["Number Of Total Clicks"];
//            emailObj.numberOfUniqueClicks = d["Number Of Unique Clicks"];
//            emailObj.opened = d.Opened;
//            emailObj.relatedStudentContactId = d["Related Student Contact ID"];
//            emailObj.softBounce = d["Soft Bounce"];
//            emailObj.subjectLine = d["Subject Line"];
//         runInsertToDB(emailObj);
//      });
// };

// //POST from upload, iterate over each of the items in the parsed array of objects:
module.exports.insertEmailsIntoDB = (csvEmailObjs) => {
    csvEmailObjs.forEach( (emailObj) => {
        db.run(`INSERT INTO EmailFiles VALUES (null, 
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
}







// //start LS make new table
// db.run(`DROP TABLE IF EXISTS Messages`);

// 	db.run(`CREATE TABLE IF NOT EXISTS Messages(
// 	    message_id INTEGER PRIMARY KEY NOT NULL,
// 	    messageType TEXT NOT NULL,
// 	    contactId TEXT NOT NULL, 
// 	    clicked TEXT NOT NULL,
// 	    contact TEXT NOT NULL,
// 	    contactRecordType TEXT NOT NULL, 
// 	    createdDate TEXT,
// 	    dateBounced DATE, 
// 	    dateOpened DATE, 
// 	    dateSent DATE NOT NULL, 
// 	    dateUnsubscribed DATE, 
// 	    deleted TEXT NOT NULL, 
// 	    inboundNumber TEXT,
// 	    mobileNumber TEXT,
// 	    email TEXT NOT NULL, 
// 	    emailName TEXT NOT NULL, 
// 	    fromAddress TEXT, 
// 	    fromName TEXT NOT NULL, 
// 	    hardBounce TEXT NOT NULL, 
// 	    numberOfTotalClicks INTEGER NOT NULL, 
// 	    numberOfUniqueClicks INTEGER NOT NULL, 
// 	    opened TEXT NOT NULL, 
// 	    relatedStudentContactId TEXT, 
// 	    softBounce TEXT NOT NULL, 
// 	    subjectLine TEXT,
// 	    SMS TEXT,
// 	    campaign TEXT,
// 	    deliveryStatus TEXT,
// 	    disableSMSOnTrigger TEXT,
// 	    sentStatus TEXT
// 	)`);



// //POST from upload, iterate over each of the items in the parsed array of objects:
module.exports.insertMessagesIntoDB = (csvMessageObjs) => {
    csvEmailObjs.forEach( (messageObj) => {
        db.run(`INSERT INTO messages VALUES (null, 
        	'${messageObj.messageType}', 
        	'${messageObj.contactId}', 
        	'${messageObj.clicked}', 
        	'${messageObj.contact}', 
        	'${messageObj.contactRecordType}', 
        	'${messageObj.createdDate}', 
        	'${messageObj.dateBounced}', 
        	'${messageObj.dateOpened}', 
        	'${messageObj.dateSent}', 
        	'${messageObj.dateUnsubscribed}', 
        	'${messageObj.deleted}', 
        	'${messageObj.inboundNumber}', 
        	'${messageObj.mobileNumber}', 
        	'${messageObj.email}', 
        	'${messageObj.emailName}', 
        	'${messageObj.fromAddress}', 
        	'${messageObj.fromName}', 
        	'${messageObj.hardBounce}', 
        	${messageObj.numberOfTotalClicks}, 
        	${messageObj.numberOfUniqueClicks}, 
        	'${messageObj.opened}', 
        	'${messageObj.relatedStudentContactId}', 
        	'${messageObj.softBounce}', 
        	'${messageObj.subjectLine}',
        	'${messageObj.SMS}',
        	'${messageObj.campaign}',
        	'${messageObj.deliveryStatus}',
        	'${messageObj.disableSMSOnTrigger}',
        	'${messageObj.sentStatus}'
    	)`);
    });
}



// // //uncommenting this will call this function and input those objects above
	// module.exports.insertEmailsIntoDB(csvEmailObjs);
// // 	// module.exports.insertMessagesIntoDB(csvMessageObjs);
// });

module.exports.searchByContactId = (contactId) => {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM Messages WHERE contactId = "${contactId}"`, (err, messagesData) => {
	        if (err) return reject(err);//if error, pass on to error handler
	        resolve(messagesData);
		});
	});
};

//clean up and start building out step by step
module.exports.uploadFileToDB = (fileObjsArr) => {
	console.log("file going in");
	console.log("fileObjsArr, fakely 0", fileObjsArr[0]['Contact ID']);
	return new Promise( (resolve, reject) => {
	console.log("fileObjsArr, fakely 1", fileObjsArr[0]['Contact ID']);

	//create empty strings/sub numbers for all values just in case

	//try checking out a new branch and then using the same front end stuff?? 

	//try making a whole new back end based on what you have learned with sequelize
	// then see if you can use something like bulkinsert... find out how papaparse works and
	//if that can be a json file... maybe stdout write it to a file or something
	//then you should be able to use that as a 'seeder' ... but is there a way to sequelize it 
	//straight as a json collection, like instead of importing from a seed data file let {} = require whatever
	//just go ahead and straight up import and then bulkinsert that stuff?

		fileObjsArr.forEach( (file) => {
			if (file['Contact ID']) {

			console.log("file file file", file);
			db.run(`INSERT INTO EmailFiles (contactId, clicked) VALUES ("${file['Contact ID']}", "${file.Clicked}")`,
	        	// '${file.Clicked}', 
	        	// '${file.Contact}', 
	        	// '${file['Contact ID']}', 
	        	// '${file["Contact Record Type"]}', 
	        	// '${file["Date Bounced"]}', 
	        	// '${file['Date Opened']}', 
	        	// '${file["Date Sent"]}', 
	        	// '${file["Date Unsubscribed"]}', 
	        	// '${file.Deleted}', 
	        	// '${file.Email}', 
	        	// '${file["Email Name"]}', 
	        	// '${file['From Address']}', 
	        	// '${file["From Name"]}', 
	        	// '${file["Hard Bounce"]}', 
	        	// ${file["Number Of Total Clicks"]}, 
	        	// ${file["Number Of Unique Clicks"]}, 
	        	// '${file.Opened}', 
	        	// '${file["Related Student Contact ID"]}', 
	        	// '${file["Soft Bounce"]}', 
	        	// '${file["Subject Line"]}'
	        	// ),
	    	 (err, successMessage) => {
	        if (err) return reject(err);//if error, pass on to error handler
	        resolve(successMessage);
		});
			//ask JUFE - or someone - how can I resolve this not inside foreach?- or what else to do here
			}
	})
	});
};

//Needed methods: GET by contactId and by contact, also by relatedStudentContactId at the same time as the contactId search
//DELETE - when the record is 3 years old- GET all things that are three years old, then iterate over their IDs and delete them?