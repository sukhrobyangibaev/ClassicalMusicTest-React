/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";
import MiniPlayer from "../components/MiniPlayer";

function finish({ player: { _id, username, points, answers } }) {
  const handleRetry = async () => {
    await axios.post("/refreshplayer", { id: _id }).catch(error => {
      console.log(error);
    });
    Router.push({
      pathname: "/game",
      query: { id: _id }
    });
  };

  return (
    <Layout>
      <div className="container">
        <p>
          Congratulations {username}, your score is {points}/10
        </p>
        <p>Checklist:</p>
      </div>
      <div>
        {answers.map(ans => (
          <div key={ans._id}>
            <hr className="hrWide" />
            <div className={`finisListItem ${ans.right ? "correct" : "wrong"}`}>
              <div>
                <p className="finisListItemText">
                  Your answer: {ans.givenAnswer}
                </p>
                {!ans.right && (
                  <p className="finisListItemText">
                    Correct answer: {ans.correctAnswer}
                  </p>
                )}
              </div>
              <MiniPlayer src={ans.sound} />
            </div>
          </div>
        ))}
      </div>
      <hr className="hrWide" />

      <div className="buttonContainer">
        <button className="directingButton" type="button" onClick={handleRetry}>
          Try Again
        </button>
        <a href="/toplist">
          <button className="directingButton" type="button">
            <Link href="/toplist">
              <a>Show Toplist</a>
            </Link>
          </button>
        </a>
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
        .hrWide {
          height: 5px;
        }
        .finisListItem {
          display: grid;
          grid-template-columns: auto 60px;
          align-items: center;
        }
        .finisListItemText {
          font-size: 1.2em;
          font-weight: 100;
          color: black;
          padding: 5px 0 5px 5px;
          margin: 0;
        }
        .correct {
          background: rgba(56, 239, 125, 0.7);
        }
        .wrong {
          background: rgba(255, 75, 43, 0.7);
        }
        .buttonContainer {
          display: flex;
          justify-content: space-around;
        }
        .directingButton {
          background: #5f2c82;
          color: white;
          height: 30px;
          width: 120px;
          font-size: 0.8em;
          border: none;
          border-radius: 25px;
          font-weight: 100;
          margin: 20px 0;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
        }
        a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
}

finish.getInitialProps = async ({ query: { id } }) => {
  const res = await axios
    .get(`/getanswers`, { params: { id } })
    .catch(error => {
      console.log(error);
    });
  if (res) return { player: res.data };
  return {};
};

export default finish;
