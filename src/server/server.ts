import express from "express";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import schema from "./schema";
import bodyParser from "body-parser";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
var PLAID_ENV = process.env.PLAID_ENV;
// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
var PLAID_PRODUCTS = process.env.PLAID_PRODUCTS;
var ITEM_ID = process.env.ITEM_ID;
var PLAID_COUNTRY_CODES = process.env.PLAID_COUNTRY_CODES;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var PLAID_OAUTH_REDIRECT_URI = "";
var PLAID_OAUTH_NONCE = "";
const app = express();

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client");
  app.set("views", clientPath);
  app.use(express.static(clientPath));
  app.get("*", (req: any, res: any) => {
    res.sendFile("index.html", { root: clientPath });
  });
}


app.set("view engine", "ejs");

app.get("/login", (req, res, next) => {
  res.render("index.ejs", {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
    PLAID_PRODUCTS: PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES: PLAID_COUNTRY_CODES,
    PLAID_OAUTH_REDIRECT_URI: PLAID_OAUTH_REDIRECT_URI,
    PLAID_OAUTH_NONCE: PLAID_OAUTH_NONCE,
    ITEM_ID: ITEM_ID,
    ACCESS_TOKEN: ACCESS_TOKEN
  });
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const plaidAccessToken = req.headers['plaid-access-token'] || ''
    return { plaidAccessToken }
  }
});
apolloServer.applyMiddleware({ app, path: "/graphql" });
const appServer = createServer(app);

export default appServer;
