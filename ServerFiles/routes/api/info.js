const router = require("express").Router();
const infoController = require("../../controllers/infoController");

// Matches with "/api/info"
router.route("/info/")
  .get(infoController.findAll)
  .post(infoController.create);

// Matches with "/api/info/name/:name"
router.route("/info/name/:name")
  .get(infoController.findByName);

// Matches with "/api/info/:id"
router
  .route("/info/:id")
  .get(infoController.findById)
  .put(infoController.update)
  .delete(infoController.remove);

module.exports = router;
