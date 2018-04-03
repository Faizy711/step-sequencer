const router = require("express").Router();
const userRoutes = require("./user");
const padsRoutes = require("./pads");

// User routes
router.use("/user", userRoutes);
router.use("/pads", padsRoutes);

module.exports = router;
