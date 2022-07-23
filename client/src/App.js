import "./App.css";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const api_key = process.env.REACT_APP_STREAM_IO_APIKEY;
  const cookies = new Cookies();

  // Attempt to get user Token if has been set already. If so means someone has logged in, else not.
  const token = cookies.get("token");

  // Client reference of the stream chat instance. Will be used to connect user with their account
  const client = StreamChat.getInstance(api_key);

  // State to set whether a user is already authenticated or not. Using that knowledge will help decide what to show the user.
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  // If token has been set, will attempt to connect user with client variable
  if (token) {
    // Connect to the user that has the listed matching information
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}> Logout </button>
        </Chat>
      ) : (
        <>
          <Signup setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
