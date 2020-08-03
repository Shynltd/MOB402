var uniqid = require('uniqid');
var fs = require('fs');
var brands = require('../models/brands');
var cars = require('../models/cars');

module.exports.getAllBrands = async (req, res) => {
    let brand = await brands.find({});
    // res.json('http://localhost:2000/patients')
    res.render('brand/brands', {brands: brand})
}

module.exports.getCarByBrand = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let dulieu = req.params.id;
    let test = await brands.findOne({name: dulieu})
        .catch((err) => {
            res.send('Lỗi')
        })
    let test1 = await cars.find({brand: dulieu})
    res.render('brand/carByBrand', {test, cars: test1.slice(start, end)});
    console.log(test1);
}

module.exports.getCreate = (req, res) => {
    res.render('brand/createBrand')
}

module.exports.postCreate = async (req, res) => {
    let name = req.body.name;
    let logo = null;
    if (req.files){
        logo = req.files.logo;
        let filename = "logo/" + uniqid()+ "-" +logo.name;
        logo.mv(`./uploads/${filename}`)
        logo = filename;
    }
    let save = await brands.create({name: name, image: logo});
    if (save.id != undefined) {
        res.redirect('/brands');
    } else {
        res.send('Lỗi con mẹ nó rồi');
    }
}

module.exports.removeBrandById = async (req, res) => {
    let brandId = req.params.id;
    let brand = await brands.findById(brandId);
    fs.unlinkSync(`./uploads/${brand.image}`);
    brands.findOneAndRemove({_id: brandId}).catch(err => {
        res.send("Lỗi con mẹ nó r")
    });
    res.redirect('/brands');
}
module.exports.getUpdateBrandById = async (req, res) => {
    let brandId = req.params.id;
    let updateBrand = await brands.findOne({_id: brandId});
    res.render('brand/updateBrand', {updateBrand})
}
module.exports.postUpdateBrandById = async (req, res) => {
    let brandId = req.params.id;
    let name = req.body.name;
    let brand = await brands.findById(brandId);
    let image = brand.image;
    if (req.files){
        fs.unlinkSync(`./uploads/${image}`);
        image = req.files.logo;
        let filename = "logo/" + uniqid()+ "-" +image.name;
        image.mv(`./uploads/${filename}`)
        image = filename;
    }
    let updateBrand = await brands.findOneAndUpdate({_id: brandId}, {
        name: name,
        image: image
    });
    if (updateBrand) {
        res.redirect('/brands');
    } else {
        res.send("Lỗi con mẹ nó rồi bạn ơi !!!")
    }

}