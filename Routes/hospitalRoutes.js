const express = require('express');
const router = express.Router();

const AppError = require('../Utils/AppError')
const AsyncWrap = require('../Utils/AsyncWrap')

const viewDashboardController = require('../Controllers/HospitalControllers/hospitalDashboard')

//ADD THIS (authcontrol) MIDDLEWARE IN ANY ROUTE TO MAKE IT PRIVATE ROUTE:-
const authControl = require('../Middlewares/authController')

const registerHospitalAutorityForm = require('../Controllers/HospitalControllers/registerHospitalAutorityForm');
const addUser = require('../Controllers/HospitalControllers/addHospitalAutority');
const loginUser = require('../Controllers/HospitalControllers/loginControl');
const loginForm = require('../Controllers/HospitalControllers/loginForm');
const otpForm = require('../Controllers/HospitalControllers/otpForm');
const hospitalAddition = require('../Controllers/HospitalControllers/otpValidate');
const bloodReqController = require('../Controllers/HospitalControllers/bloodRequestControl');
const hospitalAuthControl = require('../Middlewares/hospitalAuthControl');
const bloodStock = require('../Controllers/HospitalControllers/bloodStock');

router.get('/dashboard',hospitalAuthControl, viewDashboardController)
router.get('/register',registerHospitalAutorityForm);
router.get('/login',loginForm);
router.get('/otpform',otpForm);
router.post('/addition',hospitalAddition)//hostpital autority registration
router.post('/register',addUser)//hostpital autority registration
router.post('/login',loginUser);//hospital autority login
router.post("/donation", bloodReqController);
router.post('/add-blood-stock',hospitalAuthControl,bloodStock)

module.exports = router