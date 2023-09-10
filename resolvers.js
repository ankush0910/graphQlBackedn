// server/resolvers.js
const { AuthenticationError } = require('apollo-server-express');

const Weather = require('./model/weatherModel');
const { default: axios } = require('axios');



const resolvers = {
  Query: {
    getWeatherByZip: async (_, { zipCode }) => {
      // Check if weather data is cached in MongoDB
      const cachedData = await Weather.findOne({ zipCode });
      if (cachedData) {
        return cachedData;
      }

      // Fetch weather data from the external service
     
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&appid=${process.env.MET_NORWAY_API_KEY}`
      );


      // Extract relevant data from the response
      const weatherData = {
        name :  response.data.name,
        region : response.data.sys.country,
        icon:  response.data.weather[0].icon,
        clouds:  response.data.weather[0].main,
        humidity : response.data.main.humidity,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      };

      // Cache the data in MongoDB for future use
      await Weather.create({ zipCode, ...weatherData });

      return weatherData;
    },
    getWeatherByCity: async (_, { city }) => {
      const cachedData = await Weather.findOne({ city });
      if (cachedData) {
        return cachedData;
      }

      // Fetch weather data from the external service
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.MET_NORWAY_API_KEY}`
      );


      // Extract relevant data from the response
      const weatherData = {

        name :  response.data.name,
        region : response.data.sys.country,
        icon:  response.data.weather[0].icon,
        clouds:  response.data.weather[0].main,
        humidity : response.data.main.humidity,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      };

      // Cache the data in MongoDB for future use
      await Weather.create({ city, ...weatherData });

      return weatherData;
    },
  },

};

module.exports = resolvers;
