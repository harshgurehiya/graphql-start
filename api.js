const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
//gql is for editor syntax highlighting & auto-formatting with prettier extension.
//gql is also statically analyzing our graphQl queries.

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app }); //By default it takes '/graphql' as it's path and to change path use --> path:'/example'

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  await mongoose.connect("mongodb://0.0.0.0:27017/post_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Mongoose connected....");

  app.listen(4000, () => console.log(`🚀 Server running on port 4000....`));
}
startServer();
