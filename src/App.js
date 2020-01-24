import React, { useEffect, useReducer } from "react";
import "./styles.css"
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

// not the "actual" Y value, rather, these refer to the change in position along the Y axis
// const [p1PaddleY, setP1PaddleY] = useState(0);
// const [p2PaddleY, setP2PaddleY] = useState(0);

// why would adding value to the Y axis cause the paddle to move down?


// Set initial state to 0

const initialState = {
  paddle1: {
    y: 0,
  },
  paddle2: {
    y: 0,
  },
  ball: {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5
  }
};
// using reducer hook due to the fact that state has become more complicated than 1 value
function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_P1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE_P2":
      return { ...state, paddle2: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKey(e) {
    const char = e.key.toLowerCase();
    if (char === "w" || char === "s") {
      dispatch({
        type: "MOVE_PADDLE_P1",
        payload: {
          y: state.paddle1.y + (char === "w" ? -10 : 10)
        }
      });
    }
    if (char === "o" || char === "k") {
      dispatch({
        type: "MOVE_PADDLE_P2",
        payload: {
          y: state.paddle2.y + (char === "o" ? -10 : 10)
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      if (
        state.ball.x + state.ball.dx > 400 - 20 ||
        state.ball.x + state.ball.dx < 0
      ) {
        dx = -dx;
      }
      if (
        state.ball.y + state.ball.dy > 300 - 20 ||
        state.ball.y + state.ball.dy < 0
      ) {
        dy = -dy;
      }
      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + dx,
          y: state.ball.y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="container">
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayerTwo paddleY={state.paddle2.y} />
      <Ball pos={state.ball} />
    </div>
  );
}
