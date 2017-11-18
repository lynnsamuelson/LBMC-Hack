'use strict';

const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

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
	err: err
    })
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
