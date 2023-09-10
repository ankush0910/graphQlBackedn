const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { default: mongoose } = require('mongoose');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
require("dotenv").config();
const app = express();

// Start the Apollo Server before applying the middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("MongoDb Connected")
  }).catch((err)=>{
    console.log(err)
  })

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
