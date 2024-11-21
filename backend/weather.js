
const axios = require("axios");
require('dotenv').config();

const ApiKey = process.env.apiKey

async function getLocation() {
    try {
      // Fetch location data based on IP
      const response = await axios.get("http://ip-api.com/json/");
      const { lat, lon, city, region, country } = response.data;
      return { lat, lon, city, region, country };
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }


const currWeather = async () => {
  let { lat, lon } = await getLocation();
  let response = await fetch(`https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`);
  let data = await response.json();

  // Extracting necessary details
  let date = new Date(data.dt * 1000); // Current timestamp
  let temp = data.main.temp - 273; // Convert Kelvin to Celsius
  let humidity = data.main.humidity;
  let windSpeed = data.wind.speed;
  let weatherDescription = data.weather[0].description;

  // Displaying the formatted weather details

  data = {
      Date: `${date.toLocaleString()}`,
      Temperature: `${temp.toFixed(2)}°C`,
      Humidity: `${humidity}%`,
      Wind_Speed: `${windSpeed} m/s`,
      Weather: `${weatherDescription}`
  }
  console.log(data);

};


const displayForecast = async () => {
  let { lat, lon } = await getLocation();
  let response = await fetch(`https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`);
  let data = await response.json();

  // Display specific details
  data.forEach(forecast => {
      const date = new Date(forecast.dt * 1000); // Convert UNIX timestamp to a readable format
      const temp = forecast.main.temp - 273; // Convert Kelvin to Celsius
      const humidity = forecast.main.humidity;
      const windSpeed = forecast.wind.speed;
      const weatherDescription = forecast.weather[0].description;

      data = {
        Date: `${date.toLocaleString()}`,
        Temperature: `${temp.toFixed(2)}°C`,
        Humidity: `${humidity}%`,
        Wind_Speed: `${windSpeed} m/s`,
        Weather: `${weatherDescription}`
    }

      console.log(data);
  });
};

displayForecast();
// currWeather();
