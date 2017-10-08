
const { returningHello } = require('./Hello.js');


module.exports.sayHello = (req, res, next) => {
	console.log("in the HelloCtrl");
	let results = returningHello();
	res.status(200).json(results);
}