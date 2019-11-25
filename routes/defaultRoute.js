/* eslint-disable no-shadow */
const express = require("express");
const Player = require("../components/models/player");
const Raund = require("../components/models/raund");

const router = express.Router();
const maxRaunds = 10;

function shuffle(array) {
  const arr = array;
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

router.post("/create", async (req, res) => {
  const newPlayer = await new Player({
    username: req.body.username,
    points: 0
  });
  newPlayer.save();
  res.send({ id: newPlayer.id });
});

router.get("/getraund", async (req, res) => {
  const player = await Player.findById(req.query.id);
  if (player.answers.length >= maxRaunds) {
    res.send(false);
  } else {
    const raunds = await Raund.find({ lvl: player.answers.length + 1 });
    const raund = raunds[Math.floor(Math.random() * raunds.length)];

    raund.titles = await shuffle(raund.titles);
    res.send({ raund, player });
  }
});

router.post("/answer", async (req, res) => {
  const right = req.body.givenAnswer === req.body.correct;
  const player = await Player.findById(req.body.id);

  player.points = right ? player.points + 1 : player.points;

  player.answers.push({
    lvl: player.answers.length + 1,
    right,
    givenAnswer: req.body.givenAnswer,
    correctAnswer: req.body.correct,
    sound: req.body.sound
  });

  await player.save();
  res.send();
});

router.get("/getanswers", async (req, res) => {
  const player = await Player.findById(req.query.id);
  res.send(player);
});

router.post("/refreshplayer", async (req, res) => {
  const player = await Player.findById(req.body.id);
  player.points = 0;
  player.answers = [];
  await player.save();
  res.send();
});

router.get("/gettoplist", async (req, res) => {
  const players = await Player.find({});
  players.sort((a, b) => parseFloat(b.points) - parseFloat(a.points));
  res.send(players);
});

module.exports = router;
