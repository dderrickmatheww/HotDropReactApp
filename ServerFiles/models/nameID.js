// NameID model
// ==========

// Require mongoose
const mongoose = require("mongoose");

// Create the schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the noteSchema with the schema object
const nameIdSchema = new Schema({
  // The hot drop id is what associates GiantBomb with info
  hotdropid: {
    type: Schema.Types.ObjectId,
    ref: "GiantBomb"
  },
  // The bombid is used for direct game api calls from gb
  gbid: {
    type: String,
    required: true
  },
  // The GUID is used for direct game api calls
  guid: {
    type: String,
    required: true
  },
  // The steam id is used for direct game api calls
  steamid: {
    type: String,
    required: false
  },
  // The twitch id is used for direct game api calls
  twitchid: {
    type: String,
    required: false
  },
  // Youtube id is used for direct game calls to youtube
  youtubeid: {
    type: String,
    required: false
  },
  // summary, a string, must be entered
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // tinyimageurl, a string
  tinyimageURL: {
    type: String,
    required: false
  },

});

// Create the GameNameID model using the GameNameIDSchema
const NameID = mongoose.model("NameID", nameIdSchema);

// Export the GameNameID model
module.exports = NameID;
