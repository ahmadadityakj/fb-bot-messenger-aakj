require("dotenv").config();
import express from "express";
import configView from "./config/view";
import webRoute from "./routes/web";
import bodyParser from "body-parser";

const app = express();

// setup view
configView(app);

//set body parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init routes
webRoute(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running using port ${port}`) ;
});