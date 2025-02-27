const nodemailer = require('nodemailer');
const Donour = require('../../Models/donourModel')

const bloodReqControl = async (req, res)=>{
    console.log("Received data:", req.body);
    const {bloodGroup, donationDate, bloodAmount } = req.body;
    let donours = await Donour.find({bloodGroup})
    const emails = donours.map(donour => donour.email).join(', ');
    console.log(`sending request mail to ${emails}`);

    // const statement = `Dear donour ${bloodAmount} Blood Group ${bloodGroup} is required within ${donationDate}`
    // console.log(req.body.bloodGroup);
    // res.send(statement);
    var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_MAIL,
                    pass: process.env.MAIL_PASS
                }
            });
            var mailOptions = {
                from: process.env.SENDER_MAIL,
                to: emails,
                subject: 'Blood Request from BloodMates',
                text: `Dear user ${bloodAmount} of ${bloodGroup} blood is required at emergency basis within ${donationDate}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ message: "Donation received successfully!", receivedData: req.body });
}

module.exports= bloodReqControl