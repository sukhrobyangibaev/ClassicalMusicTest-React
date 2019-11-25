const mongoose = require("mongoose");
// mongoose model config
const raundSchema = mongoose.Schema({
  lvl: Number,
  titles: [String],
  correct: String,
  sound: String
});

module.exports = mongoose.model("Raund", raundSchema);
