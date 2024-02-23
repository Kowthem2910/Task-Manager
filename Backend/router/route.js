const router = require('express').Router();
const {mail} = require('../controller.js')

router.post('/user/mail', mail);

module.exports = router;