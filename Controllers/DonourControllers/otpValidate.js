const Donour = require('../../Models/donourModel')
const NewID = require('../../Models/NewID')
const AppError = require('../../Utils/AppError')
const AsyncWrap = require('../../Utils/AsyncWrap')
const bcrypt = require('bcrypt')

const validateOtp = async (req, res) => {
    const value = req.body.otp;
    // const fname = req.body.fname;
    // const lname = req.body.lname;
    const email = req.body.email;
    const temp = await NewID.findOne({ email });
    const actualOTP = temp.otp;
    const id = temp.id;
    const firstname = temp.firstname;
    const lastname = temp.lastname;
    const pass = temp.password;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);
    console.log(`0 ${id}`)
    console.log(`actual OTP: ${actualOTP}, OTP Given: ${value}, user:${firstname}`);
    if (actualOTP == value) {
        Donour.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        })
        console.log(`1 ${id}`)
        await NewID.findByIdAndDelete(id);
        req.flash("success", "Donour registration Successful");
        res.redirect('/');
    }
    else {
        console.log(`2 ${id}`)
        await NewID.findByIdAndDelete(id)
        req.flash("fail", "OTP verification Unsuccesful")
        throw new AppError("OTP verification Unsuccessful", 400);
    }
}


module.exports = validateOtp 