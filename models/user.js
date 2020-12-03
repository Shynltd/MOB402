var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('User', userSchema, 'user');
