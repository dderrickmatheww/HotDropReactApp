// giantbomb model
// ==========

// Require mongoose
const mongoose = require("mongoose");

// Create the schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the noteSchema with the schema object
const giantbombSchema = new Schema({
  data: {
    type: Object
  } 
});

// Create the GameNameID model using the GameNameIDSchema
const GiantBomb = mongoose.model("GiantBomb", giantbombSchema);

// Export the GameNameID model
module.exports = GiantBomb;