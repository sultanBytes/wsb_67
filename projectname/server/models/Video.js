const mongoose = require('mongoose');
require('../config');

const videoSchema = new mongoose.Schema({
    coursecat:{
        type:mongoose.Schema.Types.ObjectId,  
        ref:'courses'
    },
    videotopic:{
        type:String,
        required:true
    },
    videurl:{
        type:String,
        required:true
    },
    videostatus:{
        type:Boolean,
        required:true
    }
});

const Video = mongoose.model('videos', videoSchema);
module.exports = Video;