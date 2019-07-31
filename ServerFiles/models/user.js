// NameID model
// ==========

// Require mongoose
const mongoose = require("mongoose");

// Create the schema class using mongoose's schema method
const Schema = mongoose.Schema;

// Create the userSchema with the schema object
const userSchema = new Schema({
  // The username should be unique for each user
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  // The password is a login password
  password: {
    type: String,
    required: true
  },
  // The email is used to contact users of the site & must be unique
  // We perform no verification here, but verify by having it typed twice 
  // on the create login screen
  email: {
    type: String,
    required: true,
    unique: true
  }

});

// Create the GameNameID model using the GameNameIDSchema
const User = mongoose.model("User", userSchema);

// Export the GameNameID model
module.exports = User;
