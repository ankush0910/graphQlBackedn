// server/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type Weather {
    name: String,
    region : String
    icon : String,
    clouds: String
    temperature: Float
    humidity: Float
    description: String
  }
  
  type Query {
    getWeatherByZip(zipCode: String!): Weather
    getWeatherByCity(city: String!): Weather
  }
`;

module.exports = typeDefs;
