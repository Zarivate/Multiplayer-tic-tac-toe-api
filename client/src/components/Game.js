import React, { useState } from "react";
import Board from "./Board";

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

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
      <Board />
      {/* CHAT COMPONENTS GO HERE */}
      {/* LEAVE BUTTON */}
    </div>
  );
}

export default Game;
