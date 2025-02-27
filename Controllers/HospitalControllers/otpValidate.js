const Hospital = require('../../Models/hospitalAuthority')
const TempHospital = require('../../Models/temp')
const AppError = require('../../Utils/AppError')
const AsyncWrap = require('../../Utils/AsyncWrap')

const validateOtp = async (req, res) => {
    const value = req.body.otp;
    // const fname = req.body.fname;
    // const lname = req.body.lname;
    const email = req.body.email;
    const temp = await TempHospital.findOne({ hospitalEmail : email });
    const actualOTP = temp.otp;
    const id = temp.id;
    const hospitalName = temp.hospitalName;
    const hospitalReg = temp.hospitalReg;
    const hospitalEmail = temp.hospitalEmail;
    const hospitalPhone1 = temp.hospitalPhone1;
    const hospitalPhone2 = temp.hospitalPhone2;
    const hospitalSuper = temp.hospitalSuper;
    const password = temp.password;
    const address = temp.address;
    console.log(`0 ${id}`)
    //console.log(`actual OTP: ${actualOTP}, OTP Given: ${value}, user:${firstname}`);
    if (actualOTP == value) {
        Hospital.create({
            hospitalName : hospitalName,
            hospitalReg : hospitalReg,
            hospitalEmail : hospitalEmail,
            hospitalPhone1 : hospitalPhone1,
            hospitalPhone2 : hospitalPhone2,
            hospitalSuper : hospitalSuper,
            password : password,
            address : address
        })
        console.log(`1 ${id}`)
        await TempHospital.findByIdAndDelete(id);
        req.flash("success", "Hospital registration Successful");
        res.redirect('/hospital/login');
    }
    else {
        console.log(`2 ${id}`)
        await TempHospital.findByIdAndDelete(id)
        req.flash("fail", "OTP verification Unsuccesful")
        throw new AppError("OTP verification Unsuccessful", 400);
    }
}


module.exports = validateOtp 