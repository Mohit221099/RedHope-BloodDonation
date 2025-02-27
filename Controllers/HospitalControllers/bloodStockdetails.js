const BloodStock = require("../../Models/bloodStockModel");

const bloodStockdetails= async (req, res) => {
    try {
      const stock = await BloodStock.find();
      res.json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports=bloodStockdetails;