const BloodStock = require("../../Models/bloodStockModel");

const bloodStock= async (req, res) => {
    try {
        const { bloodGroups } = req.body;
        let bloodStock = await BloodStock.findOne({ hospital: req.hospitalId });
        if (!bloodStock) {
            bloodStock = new BloodStock({ hospital: req.hospitalId, bloodGroups });
        } else {
            bloodStock.bloodGroups = bloodGroups;
        }
        await bloodStock.save();
        res.json({ message: 'Blood stock updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blood stock', error });
    }
  };
  
  module.exports=bloodStock;