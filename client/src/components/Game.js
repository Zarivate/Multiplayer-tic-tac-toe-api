import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  const [result, setResult] = useState({ winner: "none", state: "none" });

  // Will listen for when another player joins so both players can have the same things on screen at the same time.
  // Without this, one user would be unable to detect when another has joined their game
  channel.on("user.watching.start", (event) => {
    // If event above occurs, then
    setPlayersJoined(event.watcher_count === 2);
  });

  // Depending on whether two people are in the same room/channel, what the person sees is different.
  // If only one, then waiting message will appear till other player joins
  if (!playersJoined) {
    return <div>Waiting for other player to join...</div>;
  }

  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          hideDeletedMessages
          closeReactionSelectorOnClick
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          // Severs the user's connection to the other player
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div> {result.winner} has Won</div>}
      {result.state === "tie" && <div> Game Tied</div>}
    </div>
  );
}

export default Game;
