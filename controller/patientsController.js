var patients = require('../models/patients');
var hospitals = require('../models/hospitals');
const uniqid = require("uniqid");
var fs = require("fs");


module.exports.getAllpatients = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let patient = await patients.find({});
    res.render('patient/patients', {patients: patient.slice(start, end)});
};
module.exports.patientSearch = async (req, res) => {
    var s = req.query.s == undefined ? "" : req.query.s;
    var patient = await patients.find({name: new RegExp(s, 'i')});
    // var matchedCar = car.filter(car => {
    //     return car.name.toLowerCase().indexOf(s) != -1;
    // })
    res.render('patient/patients', {patients :patient})
};


module.exports.getCreate = async (req, res) => {
    let hospital = await hospitals.find({});
    res.render('patient/createPatient', {hospital})
}

module.exports.postCreate = async (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var address = req.body.address;
    var hospital_name = req.body.hospital_name;
    var bed = req.body.bed;
    var avatar = null;
    if (req.files){
        avatar = req.files.avatar;
        let filename ="/patient/"+ uniqid()+ "-" +avatar.name;
        avatar.mv(`./uploads/${filename}`)
        avatar = filename;
    }
    var addPatient = await patients.create({name: name, avatar: avatar, age: age, address: address, hospital_name: hospital_name, bed: bed});
    if (addPatient.id != undefined) {
        res.redirect('/patients');
    } else {
        res.send('Lỗi con mẹ nó rồi');
    }
}
module.exports.removePatientsById = async (req, res) => {
    let patientId = req.params.patientId;
    patients.findOneAndRemove({_id: patientId}).catch(err => {
        res.send("Lỗi con mẹ nó r")
    });
    res.redirect('/patients');
}
module.exports.getUpdatePatientsById = async (req, res) => {
    let patientId = req.params.patientId;
    let patient = await patients.findOne({_id: patientId});
    let hospital = await hospitals.find({});
    res.render('patient/updatePatient', {patient,hospital})
}
module.exports.postUpdatePatientsById = async (req, res) => {
    let patientId = req.params.patientId;
    var name = req.body.name;
    var patient = await patients.findById(patientId);
    var avatar = patient.avatar;
    var age = req.body.age;
    var address = req.body.address;
    var hospital_name = req.body.hospital_name;
    var bed = req.body.bed;
    if (req.files){
        fs.unlinkSync(`./uploads/${patient.avatar}`);
        avatar = req.files.avatar;
        let filename ="/patient/"+ uniqid()+ "-" +avatar.name;
        avatar.mv(`./uploads/${filename}`)
        avatar = filename;
    }
    let updatedPatient = await patients.findOneAndUpdate({_id: patientId}, {
        name,
        avatar,
        age,
        address,
        hospital_name,
        bed
    })
    if (!updatedPatient) {

    }
    res.redirect('/patients');
}

