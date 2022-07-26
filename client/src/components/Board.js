import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "../WinningPatterns";

function Board({ result, setResult }) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  // Player is whoever is currently playing
  const [player, setPlayer] = useState("X");

  // Turn represents whoever should be playing at the moment, is why both start as same variable "X"
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  // Whenever a user clicks a square, checks for a winning patter
  useEffect(() => {
    checkTie();
    checkWin();
  }, [board]);

  const chooseSquare = async (square) => {
    if (turn === player && board[square] === "") {
      // Alternate turn depending on the current state of player
      setTurn(player === "X" ? "O" : "X");

      // Await to send the moved made by the player to their opponent so it appears on their screen
      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });

      // Map through the current board and grab both the current value and their corresponding index
      setBoard(
        board.map((val, idx) => {
          // If the correct square is chosen and it's currently empty
          if (idx === square && val === "") {
            // Set it so the values are changed to whatever is held within player
            return player;
          }
          // Else just keep the value the same
          return val;
        })
      );
    }
  };

  // Checks to see if anyone has a winning pattern yet
  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      // Variable to hold whatever value, X or O, is within the first pattern position of Patterns
      const firstPlayer = board[currPattern[0]];
      // If the value within firstPlayer is empty, that means nobody has filled it in yet and can just return since no winning pattern
      if (firstPlayer === "") {
        return;
      }
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        // If at any point in looping through the curent Pattern the letter in the square difers, false is returned
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkTie = () => {
    // Since only way for tie to exist is if entire board is filled, set filled variable to true
    let filled = true;
    board.forEach((square) => {
      // If any square in the board is empty, there's no tie and filled is set to false
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No one", state: "tie" });
    }
  };

  // Checks to see if other player has made move and sent data to other player
  channel.on((event) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      // Variable to change the currentPlayer letter to the opposite one. If it's an "X" currently then change it to an "O" else keep it the same
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.square && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="board">
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(0);
          }}
          val={board[0]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(1);
          }}
          val={board[1]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(2);
          }}
          val={board[2]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(3);
          }}
          val={board[3]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(4);
          }}
          val={board[4]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(5);
          }}
          val={board[5]}
        />
      </div>
      <div className="row">
        <Square
          chooseSquare={() => {
            chooseSquare(6);
          }}
          val={board[6]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(7);
          }}
          val={board[7]}
        />
        <Square
          chooseSquare={() => {
            chooseSquare(8);
          }}
          val={board[8]}
        />
      </div>
    </div>
  );
}

export default Board;
