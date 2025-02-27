const jwt = require('jsonwebtoken');
const Donour = require('../../Models/donourModel')

const viewDonourProfile = async (req, res) => {
    const token = req.cookies.Bearer;
    const validate = jwt.verify(token, process.env.JWT_SECRET);
    let donour = await Donour.findOne({ email: validate.email });
    let marital = ["Single", "Married", "Divorced", "Widowed"]
    let bloodType = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    // Convert donor object to JSON and replace null/undefined values with empty strings
    donour = donour.toObject();
    Object.keys(donour).forEach(key => {
        if (donour[key] === null || donour[key] === undefined) {
            donour[key] = "";
        } else if (typeof donour[key] === 'object') {
            Object.keys(donour[key]).forEach(subKey => {
                if (donour[key][subKey] === null || donour[key][subKey] === undefined) {
                    donour[key][subKey] = "";
                }
            });
        }
    });
    console.log(`from viewDonourController ${donour}`)
    res.render('donourProfile', { donour, marital, bloodType });
}

module.exports = viewDonourProfile