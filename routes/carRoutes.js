var express = require('express');
var router = express.Router();
var carController = require('../controller/carController');

router.get('/', carController.carsList);
router.get('/createCar', carController.createCar);
router.post('/createCar', carController.addCar);
router.get('/search', carController.carSearch);
router.get('/search/:carId', carController.getParams);

router.get('/remove/:carId', carController.removeCarById);

router.get('/update/:carId', carController.getUpdateCarById);
router.post('/update/:carId',carController.postUpdateCarById);

module.exports = router;