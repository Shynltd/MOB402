var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/', userController.login);
router.post('/login', userController.checkLogin);

module.exports = router;