const BloodStock=require('../Models/bloodStockModel')
 const checkBlood=async () => {
    console.log("Checking blood stock levels...");
    const bloodStock = await BloodStock.find();
  
    bloodStock.forEach(async (blood) => {
      if (blood.unitsAvailable < blood.threshold) {
      //   await sendAlert(blood.bloodType, blood.unitsAvailable);
          console.log("blood is short");
      }
    })
};
module.exports=checkBlood;
