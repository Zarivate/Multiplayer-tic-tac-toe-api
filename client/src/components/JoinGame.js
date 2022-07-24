import React, { useState } from "react";
// Hook to allow access to client passed in from App.js
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    // Query a user with the username equal to the one the client typed in
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    // Create message if person user typed in doesn't exist
    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      // Specificed members that have access to channel. Should only be 2, the client themselves and their opponent
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
      {/* If the channel does exist/isn't null like it is as default */}
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of opponent..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          {/* Inorder to communicate between specific users, routes, or in this case Stream channels, need to be created which is what this does*/}
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
