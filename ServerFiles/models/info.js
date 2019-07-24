// Info model
// ==============

// Require mongoose
const mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the infoSchema with our schema class
const infoSchema = new Schema({
  // bombid used to populate details from the nameID mongoose model
  hotdropid: {
    type: Schema.Types.ObjectId,
    ref: "GiantBomb"
  },
  // summary, a string
  description: {
    type: String,
    required: false
  },
  // date is just a string
  releasedate: {
    type: Date,
    default: Date.now
  },
  // imageurl, a string
  imageURL: {
    type: String,
    required: false
  },
  // aliases, a string
  aliases: {
    type: String,
    required: false
  },
  // dateupdated is just a string
  dateupdated: {
    type: Date,
    required: true
  },
  // releasedate, just another date string
  releasedate: {
    type: Date,
    required: false
  },
  // and the chat comments
  comments: Object
});

// Create the Headline model using the headlineSchema
const Info = mongoose.model("Info", infoSchema);

// Export the Headline model
module.exports = Info;
