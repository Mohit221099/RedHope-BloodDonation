const express = require('express');
const router = express.Router();

const bloodStock=require('../Controllers/HospitalControllers/bloodStock');
const AsyncWrap = require('../Utils/AsyncWrap');
const bloodStockdetails = require('../Controllers/HospitalControllers/bloodStockdetails');

router.post('/update-blood',AsyncWrap(bloodStock));
router.get('/blood-stock',AsyncWrap(bloodStockdetails));