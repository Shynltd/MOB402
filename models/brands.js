var mongoose = require('mongoose');
var brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
})
module.exports = mongoose.model('Brands', brandSchema, 'brand');
