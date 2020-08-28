import React, { useRef, useState, useCallback } from "react";
import video from "./test.webm";
import "./App.css";

function App() {
  const videoRef = useRef();
  const [color, setColor] = useState();

  const onClick = useCallback(() => {
    setColor((old) => {
      switch (old) {
        case "red":
          return "green";
        case "green":
          return "white";
        default:
          return "red";
      }
    });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <video
        ref={videoRef}
        src={video}
        loop
        onClick={onClick}
        preload="auto"
        muted
        width={300}
        style={{
          border: "1px solid black",
        }}
        onMouseEnter={() => {
          videoRef.current.play();
        }}
        onMouseLeave={async () => {
          // play is a promise so wait play before pause cf: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
          await videoRef.current.play();
          videoRef.current.currentTime = 0;
          await videoRef.current.pause();
        }}
      />
    </div>
  );
}

export default App;
