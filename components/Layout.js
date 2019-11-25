import React from "react";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>ClassicalMusicTest</title>
        <link href="logo.png" rel="icon" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container">
        <div className="header">
          <img className="logo" id="logo" src="../logo.png" alt="logo" />
          <div>
            <h1 className="title">ClassicalMusicTest</h1>
          </div>
        </div>

        {children}
        <style jsx global>{`
          body {
            background: #5f2c82;
            background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);
            background: linear-gradient(to right, #49a09d, #5f2c82);
            font-family: "Barlow Condensed", sans-serif;
          }
          hr {
            margin: 0;
            height: 2px;
            border: none;
            background: linear-gradient(to right, #49a09d, #5f2c82);
          }
          button {
            outline: none;
          }
        `}</style>
        <style jsx>{`
          .container {
            background: #f5f5f5;
            max-width: 700px;
            margin: 10px auto;
            border-radius: 15px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            height: 60px;
            display: flex;
            align-items: center;
          }
          .logo {
            width: 45px;
            height: 45px;
            margin: 10px 10px;
          }
          .title {
            font-size: 40px;
            font-weight: 100;
            background: linear-gradient(to right, #49a09d, #5f2c82);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            color: none;
          }
          @media (max-width: 340px) {
            .title {
              font-size: 30px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
