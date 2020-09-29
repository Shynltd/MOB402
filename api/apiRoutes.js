let express = require('express');
let router = express.Router();
let apiController = require('./apiController');

router.get('/car',apiController.getAllCar);
router.get('/brand',apiController.getAllBrand);

router.get('/brand/:id',apiController.getCarByBrand);
router.get('/patient',apiController.getAllPatient);
router.get('/hospital',apiController.getAllHospital);
router.get('/remove/:id', apiController.removeCarById);
router.post('/login', apiController.checklogin);

module.exports = router;