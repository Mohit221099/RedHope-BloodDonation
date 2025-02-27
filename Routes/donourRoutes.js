const express = require('express');
const router = express.Router();
const addDonourConroller = require('../Controllers/DonourControllers/addDonour')
const viewDonourProfile = require('../Controllers/DonourControllers/viewDonourProfile')
const donourProfileController = require('../Controllers/DonourControllers/donourProfileController')
const addDonourForm = require('../Controllers/DonourControllers/donourRegisterform')
const otpValidateController = require('../Controllers/DonourControllers/otpValidate')
const viewDonourController = require('../Controllers/DonourControllers/viewDonour')
const logincontroller = require('../Controllers/DonourControllers/loginControl')
const loginForm = require('../Controllers/DonourControllers/loginForm')
const otpForm = require('../Controllers/DonourControllers/otpForm')
const AppError = require('../Utils/AppError')
const AsyncWrap = require('../Utils/AsyncWrap')

//ADD THIS (authcontrol) MIDDLEWARE IN ANY ROUTE TO MAKE IT PRIVATE ROUTE:-
const authControl = require('../Middlewares/authController')

router.get("/forms", addDonourForm)
router.post("/", AsyncWrap(addDonourConroller))
router.get("/register", otpForm)
router.post("/register", AsyncWrap(otpValidateController))
router.post("/login", AsyncWrap(logincontroller))
router.get("/login", loginForm)
router.get("/profile", authControl, viewDonourProfile)
router.post("/profile", donourProfileController)
router.get("/view", viewDonourController)

module.exports = router