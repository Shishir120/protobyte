const axios = require("axios");

async function getLocation() {
  try {
    // Fetch location data based on IP
    const response = await axios.get("http://ip-api.com/json/");
    const { lat, lon, city, region, country } = response.data;

    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    console.log(`Location: ${city}, ${region}, ${country}`);
    return { lat, lon, city, region, country };
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

// Example usage
getLocation();
