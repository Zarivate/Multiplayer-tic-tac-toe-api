import React from "react";

// The val holds whatever letter, X or O, needs to be displayed on the square
function Square({ chooseSquare, val }) {
  return (
    <div className="square" onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
