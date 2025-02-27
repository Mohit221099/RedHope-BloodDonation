const Hospital = require('../../Models/hospitalAuthority')

const registerHospitalAutority = (req, res)=>{
    res.render('hospitalAutorityRegistrationForm');
}

module.exports = registerHospitalAutority;