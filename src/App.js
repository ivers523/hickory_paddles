import React, { useState, useEffect } from "react";
import "./styles.css"
import Paddle from "./components/Paddle";

export default function App() {
  // not the "actual" Y value, rather, these refer to the change in position along the Y axis
  const [p1PaddleY, setP1PaddleY] = useState(0);
  const [p2PaddleY, setP2PaddleY] = useState(0);


  function handleKey(e) {
    const char = e.key.toLowerCase();
    if (char === "w" || char === "s") {
      setP1PaddleY(p1PaddleY + (char === "w" ? 10 : -10));
    }
    if (char === "o" || char === "k"){
      setP2PaddleY(p2PaddleY + (char === "o" ? 10 : -10));

    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [p1PaddleY, p2PaddleY])
  return (
    <div className="container">
      <Paddle paddleY={p1PaddleY} />
      <Paddle isPlayerTwo paddleY={p2PaddleY} />
    </div>
  );
}
