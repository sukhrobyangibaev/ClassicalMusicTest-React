import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import Layout from "../components/Layout";

const Home = () => {
  const [playerName, setPlayerName] = useState("");

  const handleChange = e => {
    setPlayerName(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const id = await axios
      .post("/create", { username: playerName })
      .then(res => res.data.id)
      .catch(error => {
        console.log(error);
      });
    Router.push({
      pathname: "/game",
      query: { id }
    });
  }
  return (
    <Layout>
      <div className="container">
        <p>Let's test your knowledge of classical music</p>
        <hr />
        <p>Write your name below:</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="your name"
              value={playerName}
              onChange={handleChange}
            />
          </div>
          <button type="submit">START</button>
        </form>
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
        input {
          font-size: 20px;
          border: 1px solid #5f2c82;
          color: #5f2c82;
          border-radius: 15px;
          outline: none;
          text-align: center;
        }
        input::placeholder {
          font-weight: 100;
        }
        button {
          background: #5f2c82;
          color: white;
          height: 50px;
          width: 120px;
          font-size: 0.8em;
          border: none;
          border-radius: 25px;
          font-weight: 100;
          margin: 20px 0;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </Layout>
  );
};

export default Home;
