import React, { useState } from "react";

function Signup() {
  // Whatever the user types in is updated through the use of states. Initialized to null at start since will be
  // progressively updated into an object of all the user's information
  const [user, setUser] = useState(null);

  const signUp = () => {
    console.log("spaghetti");
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
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}> Sign Up</button>
    </div>
  );
}

export default Signup;
