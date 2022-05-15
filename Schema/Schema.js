const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Dummy Data
const movies = [
  { name: "A", genre: "Action", id: "1" },
  { name: "B", genre: "Drama", id: "2" },
  { name: "C", genre: "Suspense", id: "3" },
];

// Define Types

const MovieType = new GraphQLObjectType({
  name: "Movie",

  // Define Relationships
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Define Root Queries

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //get data from database
        return _.find(movies, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
