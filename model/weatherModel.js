const mongoose = require("mongoose")
const WeatherSchema = new mongoose.Schema({
    city:String,
    zipCode: String,
    name: String,
    region: String,
    icon : String,
    clouds: String,
    humidity: Number,
    temperature: Number,
    description: String,
  });
  
  module.exports =  mongoose.model('Weather', WeatherSchema);