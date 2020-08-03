var cars = require('../models/cars');
var brands = require('../models/brands');
var uniqid = require('uniqid');

module.exports.carsList = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let car = await cars.find({});
    // res.render('car/cars', {cars: car.slice(start, end)});
    res.send(car)
};

module.exports.carSearch = async (req, res) => {
    var s = req.query.s == undefined ? "" : req.query.s;
    var car = await cars.find({name: new RegExp(s, 'i')});
    // var matchedCar = car.filter(car => {
    //     return car.name.toLowerCase().indexOf(s) != -1;
    // })
    res.render('car/cars', {cars: car})
};

module.exports.getParams = async (req, res) => {
    var carId = req.params.carId;
    var carr = await cars.findOne({_id: carId}).catch((err) => {
        res.send('K tìm thấy id')
    });
    res.send(`Giá: ${carr.price}`)
    console.log(carr);
}

module.exports.createCar = async (req, res) => {
    let brand = await brands.find({});
    console.log(brand);
    res.render('car/createCar', {bran : brand})
}

module.exports.addCar = async (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var brand = req.body.brand_name;
    let image = null;
    if (req.files){
        image = req.files.image;
        let filename = "logo/" + uniqid()+ "-" +image.name;
        image.mv(`./uploads/${filename}`)
        image = filename;
    }
    var addCar = await cars.create({brand: brand, name: name, image: image, price: price});
    if (addCar.id != undefined) {
        res.redirect('/car');
    } else {
        res.send('Lỗi con mẹ nó rồi');
    }
}
module.exports.removeCarById = async (req, res) => {
    let carId = req.params.carId;
    cars.findOneAndRemove({_id: carId}).catch(err => {
        res.send("Lỗi con mẹ nó r")
    });
    res.redirect('/car');
}
module.exports.getUpdateCarById = async (req, res) => {
    let carId = req.params.carId;
    let car = await cars.findOne({_id: carId});
    let bran = await brands.find({});
    res.render('car/updateCar', {car,bran})
}
module.exports.postUpdateCarById = async (req, res) => {
    let carId = req.params.carId;
    var name = req.body.name;
    var price = req.body.price;
    var brand = req.body.brand_name;
    var image = req.body.image;
    let updatedCar = await cars.findOneAndUpdate({_id: carId}, {
        name,
        price,
        brand,
        image
    })
    if (!updatedCar) {

    }
    res.redirect('/car');
}

