const jwt = require('jsonwebtoken');
const User=require('../Models/hospitalAuthority')


const authMiddleware = async(req, res, next) => {
    try {
      const token = req.cookies.Bearer;
      if (!token) {
        //req.flash("fail","you need to login first");
        res.send("Login token not found")
      } else {
        const validate = jwt.verify(token, process.env.JWT_SECRET);
        req.hospitalId=validate.userid;
        // req.user=await User.findById(validate.userid)
        // console.log(`validate ${validate.email}`);
        next();
      }
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = authMiddleware;