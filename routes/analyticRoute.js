const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticController');

router.get('/gender-distribution', analyticsController.getGenderDistribution);
router.get('/brand-device', analyticsController.getBrandDeviceDistribution);
router.get('/digital-interest', analyticsController.getDigitalInterestDistribution);
router.get('/login-hour', analyticsController.getLoginHourDistribution);
router.get('/location-distribution', analyticsController.getLocationDistribution);
router.get('/visit-date', analyticsController.getVisitDateTrend);

module.exports = router;
