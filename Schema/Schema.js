const graphql = require("graphql");
const _ = require("lodash");
const Movie = require("../Models/movie");
const Director = require("../Models/director");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = graphql;

// //Dummy Data
// const movies = [
//   { name: "A", genre: "Action", id: "1", directorId: "1" },
//   { name: "B", genre: "Drama", id: "2", directorId: "2" },
//   { name: "D", genre: "Suspense", id: "3", directorId: "2" },
//   { name: "E", genre: "Suspense", id: "4", directorId: "3" },
// ];

// const directors = [
//   { name: "Rafael", age: "27", id: "1" },
//   { name: "Eddie", age: "31", id: "2" },
//   { name: "Ardelis", age: "32", id: "3" },
// ];
// Define Types

const MovieType = new GraphQLObjectType({
  name: "Movie",

  // Define Relationships
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return _.find(directors, { id: parent.directorId });
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",

  // Define Relationships
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return _.filter(movies, { directorId: parent.id });
        return Movie.find({ directorId: parent.id });
      },
    },
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
        // return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(directors, { id: args.id });
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Director.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parents, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
