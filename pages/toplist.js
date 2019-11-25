/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

function toplist({ players }) {
  const [listLength, setListLength] = useState(10);

  const handleMore = () => {
    setListLength(listLength + 10);
  };

  const handleClick = id => {
    Router.push({
      pathname: "/finish",
      query: { id }
    });
  };

  return (
    <Layout>
      <div className="container">
        <p>TopList</p>
      </div>
      <hr />
      <hr className="hrWide" />
      <div className="toplistTable">
        <div className="topListItem">
          <p>#</p>
        </div>
        <div className="topListItem">
          <p>Player</p>
        </div>
        <div className="topListItem">
          <p>Score</p>
        </div>
      </div>
      <hr className="hrWide" />
      {players.map((player, i) => (
        <div style={{ display: i >= listLength && "none" }} key={player._id}>
          <hr />
          <div
            onClick={() => {
              handleClick(player._id);
            }}
            className="toplistTable"
          >
            <div className="topListItem">
              <p>{i + 1}</p>
            </div>
            <div className="topListItem">
              <p>{player.username}</p>
            </div>
            <div className="topListItem">
              <p>{player.points}</p>
            </div>
          </div>
        </div>
      ))}
      <hr />

      <div className="buttonContainer">
        <button
          style={{ display: listLength >= players.length && "none" }}
          type="button"
          className="directingButton"
          onClick={handleMore}
        >
          Show more...
        </button>
        <hr className="hrWide" />
        <button type="button" className="directingButton">
          <Link href="/">
            <a>Home</a>
          </Link>
        </button>
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
        a {
          text-decoration: none;
          color: white;
        }
        .hrWide {
          height: 5px;
        }
        .toplistTable {
          display: grid;
          grid-template-columns: 15% 70% 15%;
          text-align: center;
          color: #5f2c82;
        }
        .topListItem p {
          margin: 10px 0;
        }
        .buttonContainer {
          text-align: center;
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
      `}</style>
    </Layout>
  );
}

toplist.getInitialProps = async () => {
  const res = await axios.get("/gettoplist", {}).catch(error => {
    console.log(error);
  });

  if (res) return { players: res.data };
  return {};
};

export default toplist;
