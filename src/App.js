import React, { useEffect, useReducer } from "react";
import "./styles.css"
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";
import Brick from "./components/Brick";

// not the "actual" Y value, rather, these refer to the change in position along the Y axis
// const [p1PaddleY, setP1PaddleY] = useState(0);
// const [p2PaddleY, setP2PaddleY] = useState(0);

// ?why would adding value to the Y axis cause the paddle to move down?


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

  function handleKeyDown(e) {
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
    window.addEventListener("keydown", handleKeyDown);
  });

  // add event listener for key up?
  // or clear timeout? 

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let p1y = 150 + state.paddle1.y;
      let p2y = state.paddle2.y;

      if (x + dx > 400 - 20 || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy > 300 - 20 || y + dy < 0) {
        dy = -dy;
      }

      if ((p1y < y + dy && p1y + 100 > y + dy) && x < 45) {
        dx = -dx;
      }
      if ((p2y < y + dy && p2y + 100 > y + dy) && x > 685) {
        dx = -dx;
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

  const bricks = [
    {
      top: 10,
      left: 190,
      width: 20,
      height: 20
    },
    {
      top: 98,
      left: 190,
      width: 20,
      height: 100
    },
    {
      top: 260,
      left: 190,
      width: 20,
      height: 20
    }
  ];


  return (
    <div className="container">
      {bricks.map((brick) => 
      <Brick style = {brick} />)}
      
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayerTwo paddleY={state.paddle2.y} />
      <Ball pos={state.ball} />
    </div>
  );
}
