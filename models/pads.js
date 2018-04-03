const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PadsSchema = new Schema({
  Email: { 
    type: String, 
    required: true 
  },
  Pads: { 
    type: Array, 
    required: true 
  }
});

const Pads = mongoose.model("Pads", PadsSchema);

module.exports = Pads;