let patients = require('../models/patients');
let hospitals = require('../models/hospitals');
let fs = require('fs');
let uniqid = require("uniqid");

module.exports.hospitalsList = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 9;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let hospital = await hospitals.find({});
    res.render('hospital/hospitals', {hospitals: hospital.slice(start, end)});
};

module.exports.getPatientByHospital = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let perPage = 9;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    let hospitalName = req.params.hospitalName;
    let hospital = await hospitals.findOne({name: hospitalName})
        .catch((err) => {
            res.send('Lỗi')
        })
    let patient = await patients.find({hospital_name: hospitalName})
    res.render('hospital/patientByHospital', {hospital, patients: patient.slice(start, end)});
    console.log(patient);
};
module.exports.createHospitals = async (req, res) => {
    res.render('hospital/createHospital')
}

module.exports.addHospitals = async (req, res) => {
    let name = req.body.name;
    let logo = null;
    let address = req.body.address;
    let bed_number = req.body.bed_number;
    if (req.files){
        logo = req.files.logo;
        let filename ="/hospital/"+ uniqid()+ "-" +logo.name;
        logo.mv(`./uploads/${filename}`)
        logo = filename;
    }
    let addHospital = await hospitals.create({address: address, name: name, logo: logo, bed_number: bed_number});
    if (addHospital.id != undefined) {
        res.redirect('/hospital');
    } else {
        res.send('Lỗi rồi bạn ơi');
    }
}
module.exports.removeHospitalsById = async (req, res) => {
    let hospitalId = req.params.hospitalId;
    hospitals.findOneAndRemove({_id: hospitalId}).catch(err => {
        res.send("Lỗi rồi bạn ơi")
    });
    res.redirect('/hospital');
}
module.exports.getUpdateHospitalsById = async (req, res) => {
    let hospitalId = req.params.hospitalId;
    let hospital = await hospitals.findOne({_id: hospitalId});
    res.render('hospital/updateHospital', {hospital})
};

module.exports.postUpdateHospitalsById = async (req, res) => {
    let hospitalId = req.params.hospitalId;
    let name = req.body.name;
    let address = req.body.address;
    let bed_number = req.body.bed_number;
    let hospital = await hospitals.findOne({_id: hospitalId});
    let logo = hospital.logo;
    if (req.files){
        fs.unlinkSync(`./uploads/${hospital.logo}`);
        logo = req.files.logo;
        let filename ="/hospital/"+ uniqid()+ "-" +logo.name;
        logo.mv(`./uploads/${filename}`)
        logo = filename;
    }
    let updatedHospital = await hospitals.findOneAndUpdate({_id: hospitalId}, {
        name,
        address,
        logo,
        bed_number
    })
    if (!updatedHospital) {

    }
    res.redirect('/hospital');
}

