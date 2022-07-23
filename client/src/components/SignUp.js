import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Signup({ setIsAuth }) {
  // Cookies to be used for user is instantiated to be used later to set or get cookies within user browser
  const cookies = new Cookies();

  // Whatever the user types in is updated through the use of states. Initialized to null at start since will be
  // progressively updated into an object of all the user's information
  const [user, setUser] = useState(null);

  // Function that sends an API request to the backend server
  const signUp = () => {
    // Post request made to /signup as was defined in the backend index.js. The created user object is what is sent.
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;

      // To keep user signed in, a cookie is made and used for each user variable/detail. Here, a cookie called "token" is
      // set to the token variable from the API and so forth.

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <div className="signUp">
      <label> Sign Up </label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          // Spread operator used to keep the rest of the user object's values the same while only updating
          // the one object value we want to. In this case firstName value in the object.
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}> Sign Up</button>
    </div>
  );
}

export default Signup;
