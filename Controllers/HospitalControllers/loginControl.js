const Hospital = require('../../Models/hospitalAuthority')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;    
    
    const user = await Hospital.findOne({hospitalEmail : email});
    // const userid = user.id;
    // console.log(userid);
    if(!user){
        res.clearCookie('Bearer');
        //req.flash("fail","Email or Password mismatched");
        res.send("Email or password incorrect")
    }
    else{
       const valid = await bcrypt.compare(password, user.password);
       if(valid){
        const HospitalName = user.hospitalName;
        const HospitalReg = user.hospitalReg;
        const HospitalEmail = user.hospitalEmail;
        const userid = user.id;
        const token = jwt.sign({
            userid: userid,
            name: `${HospitalName}`,
            email: email
        },
        process.env.JWT_SECRET,
        { expiresIn: 60*60 });
        res.clearCookie('Bearer');
        res.cookie("Bearer", token,{
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        console.log(`token generated in HospitalControllers/loginControl`);
        res.redirect('/hospital/dashboard');
        
       }
       else{
        res.clearCookie('Bearer');
        req.flash("fail","Email or password incorrect")
        res.redirect('/hospital/login')
       }
    }
}

module.exports = authController

