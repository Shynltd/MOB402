var patients = require('../models/patients');
var hospitals = require('../models/hospitals');

module.exports.hospitalsList = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    let hospital = await hospitals.find({});
    res.render('hospital/hospitals', {hospitals: hospital.slice(start, end)});
};

module.exports.getPatientByHospital = async (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var start = (page - 1) * perPage;
    var end = page * perPage;
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
    var name = req.body.name;
    var logo = req.body.logo;
    var address = req.body.address;
    var bed_number = req.body.bed_number;
    var addHospital = await hospitals.create({address: address, name: name, logo: logo, bed_number: bed_number});
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
    var name = req.body.name;
    var address = req.body.address;
    var bed_number = req.body.bed_number;
    var logo = req.body.logo;
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

