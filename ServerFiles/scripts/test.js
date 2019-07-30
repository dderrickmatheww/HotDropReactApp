const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");

// This file empties the games collection and inserts the giant bomb data below
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/games", { useNewUrlParser: true });

db.NameID.find({name: "Apex Legends"}).then((res) => {
  console.log(res);
})