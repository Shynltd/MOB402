var express = require('express');
var router = express.Router();
var patientsController = require('../controller/patientsController')

router.get('/', patientsController.getAllpatients);
router.get('/create', patientsController.getCreate);
router.post('/create', patientsController.postCreate);

router.get('/search', patientsController.patientSearch);
router.get('/remove/:patientId', patientsController.removePatientsById);
router.get('/update/:patientId', patientsController.getUpdatePatientsById);
router.post('/update/:patientId', patientsController.postUpdatePatientsById);


module.exports = router;
