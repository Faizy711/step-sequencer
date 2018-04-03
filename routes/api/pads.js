const router = require("express").Router();
const padsController = require("../../controllers/padsController");

// Matches with "/api/books"
router.route("/")
  .get(padsController.findAll)
  .post(padsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(padsController.findById)
  .put(padsController.update)
  .delete(padsController.remove);

module.exports = router;