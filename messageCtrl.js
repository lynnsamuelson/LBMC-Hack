'use strict';
const { insertEmailsIntoDB, searchByContactId, prepEmailData, uploadFileToDB } = require('./Message.js');

let postEmailData = (req, res, next) => {
	insertEmailsIntoDB(req.body)
	.then( (data) => {
		res.status(200).json(data);
	})
    .catch( (err) => next(err));
};


let getMessagesByContactId = (req, res, next) => {
	searchByContactId(req.params.id)
	.then( (results) => {
		//do something with results-- send to front end for usable form, they will just be JSON so far
		res.status(200).json(results);
	})
	.catch( (err) => next(err));
};

let uploadFileFromWeb = (req, res, next) => {
	console.log(' messageCtrlreq.params.file', req.params.file);
	
	uploadFileToDB(req.params.file)
	.then( (results) => {
		//do something with results-- send to front end for usable form, they will just be JSON so far
		res.status(200).json(results);
	})
	.catch( (err) => next(err));
};

let prepData = prepEmailData;

module.exports = { getMessagesByContactId, prepData, postEmailData, uploadFileFromWeb };
