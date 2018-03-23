const router = require("express").Router();
const sampleRoutes = require("./sample");

router.use("/samples", sampleRoute);

module.exports = router;
