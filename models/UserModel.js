
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type :String,
        required : true
    },
    gender: {
        type:String,
        required : true
    },
    email : 
    {
        type: String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    imagePath : {
        type:String,
        default : "default.jpg"
    },
    dateCreated :{
        type : Date,
        default : Date.now()
    }

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
