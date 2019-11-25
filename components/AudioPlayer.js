/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";

export default function AudioPlayer({ sound }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState(sound);
  let Player;

  const loadPlayer = () => {
    setDuration(Player.duration);
  };

  useEffect(() => {
    setSrc(sound);
    setDuration(Player.duration);
  }, [sound]);

  const handleTimeUpdate = () => {
    setTime(Player.currentTime);
    setProgress((time / duration) * 100);
  };
  const togglePlay = () => {
    if (isPlaying) {
      Player.pause();
    } else {
      Player.play();
    }
  };

  return (
    <div>
      <audio
        src={src}
        ref={elements => {
          Player = elements;
        }}
        onLoadedMetadata={loadPlayer}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
      ></audio>

      <div className="audio-player">
        <div className="controls">
          <button type="button" className="button" onClick={togglePlay}>
            <i className={`play fa ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>
          <div className="time">
            {Math.floor(time)}
            <hr />
            {Math.floor(duration)}
          </div>
          <div className="progressContainer">
            <Line
              percent={progress}
              strokeWidth="7"
              strokeColor="#5f2c82"
              trailWidth="0.5"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .audio-player {
          width: auto;
          overflow: hidden;
          color: #5f2c82;
          padding: 1rem 0;
          position: relative;
          background: linear-gradient(to right, #49a09d, #5f2c82);
          padding: 5px 0;
          -webkit-user-select: none;
          -moz-user-select: none;
          -khtml-user-select: none;
          -ms-user-select: none;
        }
        .button {
          border: none;
          background-color: #f5f5f5;
        }
        .controls {
          background: #f5f5f5;
          width: 100%;
          display: flex;
        }
        .play {
          margin: 15px 15px;
          font-size: 40px;
          color: #5f2c82;
        }
        .time {
          font-size: 15px;
          color: #5f2c82;
          align-self: center;
        }
        .progressContainer {
          width: inherit;
          margin: auto 15px;
          align-self: center;
        }
      `}</style>
    </div>
  );
}

// .progressContainer {
//     width: inherit;
//     height: 73px;
//     margin: auto 15px;
//     align-self: center;
//   }
