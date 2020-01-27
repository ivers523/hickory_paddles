import React from "react";



export default function Brick({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100px",
        height: "25px",
        background: "white",
        borderRadius: "4px",
        border: "1px solid #333",
        ...style
      }}
    />
  );
}