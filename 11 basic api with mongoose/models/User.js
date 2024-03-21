const mongoose = require('mongoose');
require('../config');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:String
});

const User = mongoose.model('users',userSchema);

module.exports = User;