const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticController");

/**
 * @swagger
 * tags:
 *   name: Analytic
 *   description: Analytic Data
 */

/**
 * @swagger
 * /api/analytics/gender-distribution:
 *   get:
 *     summary: Get gender analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/gender-distribution", analyticsController.getGenderDistribution);

/**
 * @swagger
 * /api/analytics/age-distribution:
 *   get:
 *     summary: Get age analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/age-distribution", analyticsController.getAgeDistribution);

/**
 * @swagger
 * /api/analytics/brand-device:
 *   get:
 *     summary: Get brand device analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/brand-device", analyticsController.getBrandDeviceDistribution);

/**
 * @swagger
 * /api/analytics/digital-interest:
 *   get:
 *     summary: Get digital interest analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/digital-interest",
  analyticsController.getDigitalInterestDistribution
);

/**
 * @swagger
 * /api/analytics/login-hour:
 *   get:
 *     summary: Get login hour analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/login-hour", analyticsController.getLoginHourDistribution);

/**
 * @swagger
 * /api/analytics/location-distribution:
 *   get:
 *     summary: Get location analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/location-distribution",
  analyticsController.getLocationDistribution
);

/**
 * @swagger
 * /api/analytics/visit-date:
 *   get:
 *     summary: Get visit date analytic
 *     tags: [Analytic]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/visit-date", analyticsController.getVisitDateTrend);

module.exports = router;
