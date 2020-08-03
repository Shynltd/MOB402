var express = require('express');
var router = express.Router();
var brandController = require('../controller/brandController')

router.get('/', brandController.getAllBrands);
router.get('/search/:id', brandController.getCarByBrand);
router.get('/create', brandController.getCreate);
router.get('/remove/:id', brandController.removeBrandById);
router.get('/update/:id', brandController.getUpdateBrandById);
router.post('/update/:id', brandController.postUpdateBrandById);
router.post('/create', brandController.postCreate);

module.exports = router;
