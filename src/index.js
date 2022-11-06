import "dotenv/config";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";
import Movies from "./datasources/movie";

const uri = process.env.DATABASE_URL;
const main = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const dataSources = () => ({
  movies: new Movies(MovieModel),
});

main()
  .then(console.log("connected to database successfully"))
  .catch((error) => console.log(error));

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
