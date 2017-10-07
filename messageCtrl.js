
const { insertEmailsIntoDB, searchByContactId, prepEmailData } = require('./Message.js');


module.exports.postEmailData = (req, res, next) => {
	insertEmailsIntoDB(req.body)
	.then( (data) => {
		res.status(200).json(data);
	})
    .catch( (err) => next(err));
};


module.exports.getMessagesByContactId = (req, res, next) => {
	searchByContactId(req.params.id)
	.then( (results) => {
		//do something with results-- send to front end for usable form, they will just be JSON so far
		res.status(200).json(results);
	})
	.catch( (err) => next(err));
}

module.exports.prepData = prepEmailData;
