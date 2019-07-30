const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/info"
router.route("/info/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/info/:id"
router
  .route("/info/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
