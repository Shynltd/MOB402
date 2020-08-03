var mongoose = require('mongoose');
var patientSchema = new mongoose.Schema({

    name:String,
    avatar: String,
    age: String,
    address: String,
    hospital_name: String,
    bed: String,

})
module.exports = mongoose.model('Patients', patientSchema, 'patients');