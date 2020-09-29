var mongoose = require('mongoose');
var patientSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    avatar: String,
    age: Number,
    address: String,
    hospital_name: String,
    bed: Number,

})
module.exports = mongoose.model('Patients', patientSchema, 'patients');