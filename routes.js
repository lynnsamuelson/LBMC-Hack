'use strict'

const { Router } = require('express');
const router = Router();

const { postEmailData, getMessagesByContactId, uploadFileFromWeb } = require('./messageCtrl.js');
const { sayHello } = require('./helloCtrl.js');

router.get('/messages/:id', getMessagesByContactId); //if this route, get all emails attached to a certain id

router.post('/uploadfile', uploadFileFromWeb); //if this route, get all emails attached to a certain id
// router.post('/email/upload', postEmailData);
router.get('/hello', sayHello);

module.exports = router;