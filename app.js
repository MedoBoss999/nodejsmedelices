require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(() => console.log("connected !"));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({message: "hello je sui dev"})
  
});


module.exports = app;
