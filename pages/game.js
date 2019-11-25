import React, { useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { set } from "mongoose";
import Layout from "../components/Layout";
import AudioPlayer from "../components/AudioPlayer";

function Index({ data: { raund, player } }) {
  const router = useRouter();
  const { id } = router.query;
  const {username} = player;
  const [points, setPoints] = useState(player.points);
  const [titles, setTitles] = useState(raund.titles);
  const [lvl, setLvl] = useState(raund.lvl);
  const [correct, setCorrect] = useState(raund.correct);
  const [sound, setSound] = useState(raund.sound);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = ans => {
    setAnswered(true);

    setTimeout(async () => {
      await axios.post("/answer", { id, givenAnswer: ans, correct, sound });
      const response = await axios.get(`/getraund`, { params: { id } });
      if (response.data) {
        setPoints(response.data.player.points);
        setTitles(response.data.raund.titles);
        setLvl(response.data.raund.lvl);
        setCorrect(response.data.raund.correct);
        setSound(response.data.raund.sound);
        setAnswered(false);
      } else {
        Router.push({
          pathname: "/finish",
          query: { id }
        });
      }
    }, 2000);
  };

  const answer = ans => {
    if (ans === correct) return "correct";
    return "wrong";
  };

  return (
    <Layout>
      <div className="container">
        <p>
          Level: {lvl} <span className="separator">|</span>
          <span> {username}, Your score: </span>
          <span>{points}</span>
          <span>/10</span>
        </p>

        <AudioPlayer sound={sound} />

        <p>Choose your answer:</p>

        <div className="optionsContainer">
          {titles.map(title => (
            <button
              key={title}
              type="button"
              className={`optionBtns ${answered && answer(title)}`}
              value={title}
              disabled={answered}
              onClick={() => handleAnswer(title)}
            >
              {title}
            </button>
          ))}
        </div>

        <style jsx>{`
          .container {
            text-align: center;
            font-size: 1.5em;
            color: #5f2c82;
            font-weight: 100;
          }
          p {
            margin: 10px 10px;
          }
          .separator {
            color: #49a09d;
          }
          .optionsContainer {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          @media (max-width: 600px) {
            .optionsContainer {
              grid-template-columns: 1fr;
            }
          }
          .optionBtns {
            height: 65px;
            font-size: 0.8em;
            font-weight: 200;
            border-radius: 15px;
            margin: 3px;
            transition: background 1000ms linear;
            border: 1px solid #5f2c82;
            background-color: #ffffff;
            background-image: linear-gradient(
              to bottom,
              #ffffff 0%,
              #d7e1ec 74%
            );
          }
          .correct {
            color: black;
            background: #38ef7d;
          }
          .wrong {
            color: black;
            background: #ff4b2b;
          }
        `}</style>
      </div>
    </Layout>
  );
}

Index.getInitialProps = async ({ query: { id } }) => {
  const res = await axios.get(`/getraund`, { params: { id } }).catch(error => {
    console.log(error);
  });
  if (res) return { data: res.data };
  return {};
};

export default Index;
