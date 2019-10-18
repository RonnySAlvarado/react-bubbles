import React, { useState } from "react";
import axiosWithAuth from "./Auth/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const login = e => {
    e.preventDefault();
    console.log("inside the login function");
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);

        props.history.push("/protected");
      })
      .catch(err => console.log(err.response));
  };

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <form onSubmit={e => login(e)}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={credentials.username}
          onChange={e => handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={e => handleChange(e)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
