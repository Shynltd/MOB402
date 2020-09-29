var mongoose = require('mongoose');
var carSchema = new mongoose.Schema({

    brand: String,
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    }
})
module.exports = mongoose.model('Cars', carSchema, 'car');