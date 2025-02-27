const Hospital = require('../../Models/hospitalAuthority');
const TempHospital = require('../../Models/temp');
const nodemailer = require('nodemailer');

const addUser = async (req, res, next) => {
  const hospitalName = req.body.hname;
  const hospitalReg = req.body.hreg;
  const hospitalEmail = req.body.hemail;
  const hospitalPhone1 = req.body.hphone;
  const hospitalPhone2 = req.body.h2phone;
  const hospitalSuper = req.body.hsuper;
  const password = req.body.hpass;
  const address = req.body.address;

  const exist = await Hospital.findOne({ hospitalEmail })

  if (exist) {
    console.log("already exist")
    req.flash("fail", "Account already exist");
    res.redirect('/hospital/register');
  }
  else {
    let randNum = Math.floor(Math.random() * 1000000);
    let rand = String(randNum).padStart(6, '0');
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.MAIL_PASS
            }
        });
        var mailOptions = {
            from: process.env.SENDER_MAIL,
            to: `${hospitalEmail}`,
            subject: 'Email Verification',
            text: `Your one Time verification Code to Register Hospital/Clinic in BloodMate is: ${rand}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        console.log(`OTP sent to ${hospitalEmail}`)
        const existOTP = await TempHospital.findOne({hospitalEmail})
        if(existOTP){
            const id = existOTP.id;
            await TempHospital.findByIdAndDelete(id);
        }
        const temp = new TempHospital({
          hospitalName : hospitalName,
          hospitalReg : hospitalReg,
          hospitalEmail : hospitalEmail,
          hospitalPhone1 : hospitalPhone1,
          hospitalPhone2 : hospitalPhone2,
          hospitalSuper : hospitalSuper,
          otp : rand,
          password : password,
          address : address
        })
        await temp.save();


        //req.flash("otp", rand);
        // req.flash("fname", fname);
        // req.flash("lname", lname);
        req.flash("email", hospitalEmail);
        //req.flash("password", password);
        res.redirect('/hospital/otpform');
    } catch (error) {
        next(error)
    }
}
}
module.exports = addUser;