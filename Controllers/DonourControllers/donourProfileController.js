const bcrypt = require('bcrypt');
const Donour = require('../../Models/donourModel')

const editDonourProfile = async (req, res, next)=>{
    const obj = req.body;
    const {email, marital, phone, blood, age, location, district, state, pincode, currpass, newpass, repass} = req.body;
    const donour = await Donour.findOne({email})
    const dpass = donour.password;

    if(newpass.length !== 0){
        console.log(`Donour password at line 11 ${donour.password} curpass = ${currpass}`);
        const valid = await bcrypt.compare(currpass, donour.password);
        console.log(`line 12 passed`);
        if(valid && (newpass === repass)){
            donour.location = location;
            donour.district = district;
            donour.state = state;
            donour.pincode = pincode;
            donour.marital = marital;
            donour.phone = phone;
            donour.bloodGroup = blood;
            donour.age = age;
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(newpass, salt);
            donour.password = newPassword;

            await donour.save()
            console.log(`New password ${newpass}, hash = ${newPassword}`);
        }
        else{
            res.send("Password didn't match")
        }
    }    
    else{
        console.log(`No new password found`)
        donour.pincode = pincode;
        donour.location = location;
        donour.district = district;
        donour.state = state;
        donour.marital = marital;
        donour.phone = phone;
        donour.bloodGroup = blood;
        donour.age = age;
        donour.password = dpass;


        await donour.save()
    }
    res.redirect('/donour/profile');
}

module.exports =  editDonourProfile