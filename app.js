// The code is an example of how to configure Express to use GraphQL.
// The code starts by requiring the express module.
// Next, it creates a new Express app and uses the /graphql endpoint to handle GraphQL requests.
// The schema is then required from a file called Schema/schema .
// Next, middleware is used to interact with GraphQL requests.
// This includes using graphiql: true which allows users to use their browser's built-in query editor for queries instead of having to type them in manually.
// Next it's define the port the app will listen to.

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });

const app = express();

const DB = process.env.DATABASE;
mongoose.connect(DB, { useNewUrlParser: true });

// Middleware - Interact with Graphql
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("listening on port 4000...");
});
