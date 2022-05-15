const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schema/schema");

const app = express();

// Middleware - Interact with Graphql
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("listening on port 4000...");
});
