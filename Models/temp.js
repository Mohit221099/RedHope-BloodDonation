const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type: String,
        required: true
    },
    hospitalReg:{
        type: String,
        required: true
    },
    hospitalEmail:{
        type: String,
        required: true,
        unique: true      
    },
    hospitalPhone1:{
        type: String,
        required: true,
        unique: true     
    },
    hospitalPhone2:{
        type: String,
        required: true,
        unique: true      
    },
    hospitalSuper:{
        type: String,
        required: true,
        unique: true      
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type : Number
    },
    address: {
        location: String,
        district: String,
        state: String,
        pincode: String
    }
});

const TempHospital = mongoose.model("TempHospital", hospitalSchema);

module.exports = TempHospital