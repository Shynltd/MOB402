var express = require('express');
var router = express.Router();
var hospitalsController = require('../controller/hospitalsController');

router.get('/', hospitalsController.hospitalsList);
router.get('/create', hospitalsController.createHospitals);
router.get('/search/:hospitalName', hospitalsController.getPatientByHospital);
router.post('/create', hospitalsController.addHospitals);
router.get('/remove/:hospitalId', hospitalsController.removeHospitalsById);
router.get('/update/:hospitalId', hospitalsController.getUpdateHospitalsById);
router.post('/update/:hospitalId',hospitalsController.postUpdateHospitalsById);

module.exports = router;