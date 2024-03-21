const mongoose = require('mongoose');
require('../config');

const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    courseprice:{
        type:String,
        required:true
    },
    courseduration:{
        type:String,
        required:true
    },
    coursedes:{
        type:String,
        required:true
    },
    courseimage:{
        type:String,
        required:true
    },
    cousrestatus:{
        type:Boolean,
        required:true
    }
});

const Course = mongoose.model('courses', courseSchema);
module.exports = Course;