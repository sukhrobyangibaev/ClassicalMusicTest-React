const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  username: String,
    points: Number,
    answers: [
        {
            lvl: String,
            right: Boolean,
            givenAnswer: String,
            correctAnswer: String,
            sound:String
        }
    ]
});

// eslint-disable-next-line no-multi-assign
module.exports = mongoose.model("Player", playerSchema);
