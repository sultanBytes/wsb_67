const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wsb_67');

const User = new mongoose.Schema({
    name:{
    type:String,
    trim:true,
    required:true
    },
    email: {
        type:String
    },
    contact:{
        type:String
    }
});

const UserModel = mongoose.model("Users", User);

module.exports = UserModel;