const express = require("express");
const { body } = require("express-validator");
const { query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/create",
  authMiddleware.authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination Address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid Vehicle Type"),
  rideController.createRide
);

router.get(
  "/get-fare",
  authMiddleware.authUser,
  (req, res, next) => {
    console.log("full url:", req.originalUrl);
    console.log("Req url:", req.url);
    console.log("query parameter:", req.query);
    next();
  },
  [
    query("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Pickup Address"),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Destination Address"),
  ],

  rideController.getFare
);

router.post(
  "/confirm",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isMongoId().withMessage("Invalid Ride ID"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  rideController.startRide
);

router.post(
  "/end-ride",
  authMiddleware.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  rideController.endRide
);

module.exports = router;
