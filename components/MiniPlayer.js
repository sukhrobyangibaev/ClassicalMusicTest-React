/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from "react";

export default function MiniPlayer({ src }) {
  const [IsPlaying, setIsPlaying] = useState(false);
  let Player;

  const handleClick = () => {
    if (IsPlaying) {
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button type="button" onClick={handleClick}>
        <i
          className={`playFinishPage fa ${IsPlaying ? "fa-pause" : "fa-play"}`}
        ></i>
      </button>

      <style jsx>{`
        .playFinishPage {
          font-size: 40px;
          color: rgba(95, 44, 130, 0.9);
          margin: 10px 10px;
        }
        button {
          border: none;
          background: none;
        }
      `}</style>
    </div>
  );
}
