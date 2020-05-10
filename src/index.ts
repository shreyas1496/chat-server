import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
const express = require("express");
import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/chat";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [ChatResolver],
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
