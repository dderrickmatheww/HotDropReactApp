const router = require("express").Router();
const giantbombController = require("../../controllers/giantbombController");

// Matches with "/api/giantbomb"
router.route("/giantbomb/")
  .get(giantbombController.findAll)
  .post(giantbombController.create);

// Matches with "/api/giantbomb/:id"
router
  .route("/giantbomb/:id")
  .get(giantbombController.findById)
  .put(giantbombController.update)
  .delete(giantbombController.remove);

module.exports = router;