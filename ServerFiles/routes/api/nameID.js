const router = require("express").Router();
const nameController = require("../../controllers/nameController");

// Matches with "/api/nameID/autocomplete/:name"
router
  .route("/autocomplete/:name")
  .get(nameController.autocomplete)
  .put(nameController.update);
  
// Matches with "/api/nameID"
router
  .route("/")
  .get(nameController.findAll)
  .post(nameController.update);

// Matches with "/api/nameID/:id"
router
  .route("/:id")
  .get(nameController.findById)
  .put(nameController.update);

module.exports = router;