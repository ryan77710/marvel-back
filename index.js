const express = require("express");
const cors = require("cors");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const app = express();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userRoute = require("./Route/user");
app.use(userRoute);

const marvelRoute = require("./Route/marvelRoute");
app.use(marvelRoute);

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

app.listen(3100, () => {
  console.log("server has started");
});
