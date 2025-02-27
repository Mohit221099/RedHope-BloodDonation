const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    donationDate: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] // Restrict to valid blood groups
    },
    bloodAmount: {
        type: Number,
        required: true,
        min: 100, // Minimum 100ml
        max: 500  // Maximum 500ml
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
