var cars = require('../models/cars');
var brands = require('../models/brands');
var hospitals = require('../models/hospitals');
var patients = require('../models/patients');
var users = require('../models/user');
var fs = require('fs');

module.exports.checklogin = async (req, res) => {
    let user = req.body.userName;
    let userId = await users.findOne({userName: user});
    if (userId) {
        let password = req.body.passWord;
        if (userId.passWord == password) {
            res.json({status: "OK", user: userId});
        } else {
            res.json({status: "Mật khẩu không chính xác"});
        }

    } else {
        res.json({status: "Tài khoản không tồn tại"})
    }
}

module.exports.getAllCar = async (req, res) => {
    let car = await cars.find({});
    res.json(car);
}

module.exports.getAllBrand = async (req, res) => {
    let brand = await brands.find({});
    res.json(brand);
}

module.exports.getAllHospital = async (req, res) => {
    let hospital = await hospitals.find({});
    res.json(hospital);
}
module.exports.getAllPatient = async (req, res) => {
    let patient = await patients.find({});
    res.json(patient);
}
module.exports.getCarByBrand = async (req, res) => {
    let dulieu = req.params.id;
    let test = await brands.findOne({_id: dulieu})
        .catch((err) => {
            res.json({status: "Lỗi"})
        })
    let test1 = await cars.find({brand: test.name})
    res.json(test1);
}
module.exports.removeCarById = async (req, res) => {
    let carId = req.params.id;
    let car = await cars.findById(carId);

    fs.unlinkSync(`./uploads${car.image}`);
  cars.findOneAndRemove({_id: carId}).catch(err => {
        res.json({status:"Lỗi" });
    });
      res.json({status:"Xóa thành công"});
}
