const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  // calculate fare based on distance
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    car: 50,
    moto: 15,
  };

  const perKmRate = {
    auto: 10,
    car: 20,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 1,
    car: 2,
    moto: 1,
  };

  // Extract numeric distance value from formatted distance string
  const distanceKm = parseFloat(distanceTime.distance.split(" ")[0]);

  // Extract numeric duration value from formatted duration string
  const durationParts = distanceTime.duration.split(" ");
  let durationHours = 0;
  let durationMinutes = 0;

  if (durationParts.includes("days")) {
    const daysIndex = durationParts.indexOf("days");
    const days = parseInt(durationParts[daysIndex - 1]);
    durationHours += days * 24;
  }

  if (durationParts.includes("hours")) {
    const hoursIndex = durationParts.indexOf("hours");
    durationHours += parseInt(durationParts[hoursIndex - 1]);
  }

  if (durationParts.includes("minutes")) {
    const minutesIndex = durationParts.indexOf("minutes");
    durationMinutes = parseInt(durationParts[minutesIndex - 1]);
  }

  const totalDurationMinutes = durationHours * 60 + durationMinutes;

  // Calculate fare based on distance and duration
  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceKm * perKmRate.auto +
        totalDurationMinutes * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceKm * perKmRate.car +
        totalDurationMinutes * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        distanceKm * perKmRate.moto +
        totalDurationMinutes * perMinuteRate.moto
    ),
  };

  return fare;
}

module.exports.getFare = getFare;

function getOTP(num) {
  function generateOTP() {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }

  return generateOTP(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare,
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id }
  );

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride ID is required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId,
      captain: captain._id
     })
    .populate("user")
    .populate("captain").select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  // sendMessageToSocketId(ride.user.socketId, {
  //   event: "ride-ended",
  //   data: ride,
  // });
  
  return ride;
};
