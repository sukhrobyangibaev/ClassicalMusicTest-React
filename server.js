/* eslint-disable prefer-template */
const next = require("next");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axiosDefaults = require("axios/lib/defaults");
const defaultRoute = require("./routes/defaultRoute");
//  const seedDB = require("./seeds");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // connecting to db
  mongoose
    .connect("mongodb://localhost:27017/cmt_react", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log("connected to db...");
    })
    .catch(err => {
      console.log("error with connection to db", err.message);
    });

  // eslint-disable-next-line no-path-concat
  server.use(express.static(__dirname + "/public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use("/", defaultRoute);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // seedDB();
  axiosDefaults.baseURL = "http://localhost:3000";

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Server is on localhost:${PORT}`);
  });
});
