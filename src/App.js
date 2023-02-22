import React, { useState } from "react";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "password1"
    },
    {
      username: "user2",
      password: "password2"
    }
  ];

  const errors = {
    unameErrMsg: "invalid username",
    passwordErrMsg: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { unameErrMsg, passwordErrMsg } = document.forms[0];

    // Find user login info
    const userData = database.find(
      (user) => user.username === unameErrMsg.value
    );

    // Compare user info
    if (userData) {
      if (userData.password !== passwordErrMsg.value) {
        // Invalid password
        setErrorMessages({
          name: "passwordErrMsg",
          message: errors.passwordErrMsg
        });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "unameErrMsg", message: errors.unameErrMsg });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="unameErrMsg" required />
          {renderErrorMessage("unameErrMsg")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="passwordErrMsg" required />
          {renderErrorMessage("passwordErrMsg")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;
