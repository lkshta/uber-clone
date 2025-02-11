const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return {
        ltd: parseFloat(lat),
        lng: parseFloat(lon),
      };
    } else {
      throw new Error("No coordinates found for the given address");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  try {
    const originCoords = await this.getAddressCoordinate(origin);
    const destinationCoords = await this.getAddressCoordinate(destination);

    const response = await axios.get(
      `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destinationCoords.lng},${destinationCoords.ltd}`,
      {
        params: {
          overview: "false",
          geometries: "geojson",
          alternatives: false,
          steps: false,
          annotations: true,
        },
      }
    );

    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const { distance, duration } = response.data.routes[0];

      // Format distance
      let distanceFormatted;
      if (distance < 1000) {
        distanceFormatted = `${distance.toFixed(2)} m`;
      } else {
        const distanceKm = distance / 1000;
        distanceFormatted = `${distanceKm.toFixed(2)} km`;
      }

      // Convert duration from seconds to hours and minutes
      const durationHours = Math.floor(duration / 3600);
      const remainingMinutes = Math.floor((duration % 3600) / 60);

      let durationFormatted;
      if (durationHours < 24) {
        durationFormatted = `${durationHours} hours ${remainingMinutes} minutes`;
      } else {
        const durationDays = Math.floor(durationHours / 24);
        const remainingHours = durationHours % 24;
        durationFormatted = `${durationDays} days ${remainingHours} hours ${remainingMinutes} minutes`;
      }

      return {
        distance: distanceFormatted,
        duration: durationFormatted,
      };
    } else {
      throw new Error(
        "No distance and time found for the given origin and destination"
      );
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: input,
          format: "json",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      return response.data.map((place) => place.display_name);
    } else {
      throw new Error("No suggestions found for the given address");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

  // radius in km

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6378.1],
      },
    },
  });
  return captains;
};
