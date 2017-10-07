'use strict';

let express = require('express');
let app = express();
let routes = require('./routes.js');

app.use('/', routes);

app.use( (req, res, next) => {
    let error = new Error('sorry, not found.');
    error.status = 404;
    next(error);
});

app.use( (err, req, res, next) => {
    console.log(err)
    res.status(err.status||500);
    res.json({
    message:"A problem occurred.",
	err:err
    })
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});