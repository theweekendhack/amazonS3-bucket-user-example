
const mongoose = require("mongoose");

const { Schema } = mongoose;

const heroSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    gender : {
        type :String,
        required : true
    },
    powerLevel : 
    {
        type: Number,
        required:true
    },
    comicbookType : {
        type:String,
        required:true
    },
    realName : 
    {
        type: String
    },
    imagePath:
    {
        type:String,
        default:"default.jpg"
    },
    dateCreated :{
        type : Date,
        default : Date.now()
    }

});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;
