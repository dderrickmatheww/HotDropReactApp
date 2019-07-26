const router = require("express").Router();
const gameController = require("../../controllers/gameController");

// Matches with "/api/info"
router.route("/")
  .get(gameController.findAll)
  .post(gameController.create);

// Matches with "/api/info/:id"
router
  .route("/:id")
  .get(gameController.findById)
  .put(gameController.update)
  .delete(gameController.remove);

module.exports = router;
