var mongoose = require('mongoose');
var hospitalSchema = new mongoose.Schema({

    name: String,
    address: String,
    logo: String,
    bed_number: Number
})
module.exports = mongoose.model('Hospitals', hospitalSchema, 'hospitals');