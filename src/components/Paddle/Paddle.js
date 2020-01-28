import React from "react";
import "./Paddle.css";

export default function Paddle({ isPlayerTwo, paddleY }) {
  return <div className={isPlayerTwo ? "paddle player2" : "paddle"}
    style={{ transform: `translateY(calc(-50% + ${paddleY}px)` }} />;

}