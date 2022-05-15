const { GraphQLInt } = require("graphql");
const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//Dummy Data
const movies = [
  { name: "A", genre: "Action", id: "1" },
  { name: "B", genre: "Drama", id: "2" },
  { name: "C", genre: "Suspense", id: "3" },
];

const director = [
  { name: "Rafael", age: "27", id: "1" },
  { name: "Eddie", age: "31", id: "2" },
  { name: "Ardelis", age: "32", id: "3" },
];
// Define Types

const MovieType = new GraphQLObjectType({
  name: "Movie",

  // Define Relationships
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Directors",

  // Define Relationships
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Define Root Queries

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //get data from database
        return _.find(movies, { id: args.id });
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(director, { id: args.id });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
