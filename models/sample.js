const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  title: { type: String, required: true },
  data: String
});

const Sample = mongoose.model("Sample", SampleSchema);

module.exports = Sample;
