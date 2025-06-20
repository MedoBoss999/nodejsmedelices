require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
mongoose.connect(process.env.DB_URL).then(() => console.log("connected !"));

app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.status(200).json({message: "hello je sui dev"})
  
});
app.use("/users", userRoutes);
app.use("/books", bookRoutes);


module.exports = app;
