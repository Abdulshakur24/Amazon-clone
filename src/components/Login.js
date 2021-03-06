import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, provider } from "../Firebase";
import styled from "styled-components";

function Login() {
  const history = useHistory();
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then(() => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <LoginBody>
      <Link to="/">
        <img
          className="login_image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <button type="submit" className="login_signInButton" onClick={signIn}>
            sign in with google
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
    </LoginBody>
  );
}

export default Login;

const LoginBody = styled.div`
  z-index: 1;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: white;

  .login_image {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100px;
    object-fit: contain;
    margin-right: auto;
    margin-left: auto;
  }

  .login_container {
    display: flex;
    flex-direction: column;
    width: 300px;
    border: 1px solid lightgray;
    padding: 20px;
  }

  .login_container > h1 {
    font-weight: 500;
    margin-bottom: 20px;
  }

  .login_container > form > h5 {
    margin-bottom: 5px;
  }

  .login_container > form > input {
    height: 20px;
    width: 98%;
    border: 1.5px solid;
    margin-bottom: 10px;
    background-color: white;
    border-radius: 4px;
  }

  .login_container > p {
    user-select: none;
    padding: 5px;
    border-radius: 2px;
    margin-top: 15px;
    font-size: 12px;
    background-color: rgb(210, 210, 210);
  }

  .login_signInButton {
    background-color: #f0c14b;
    border-radius: 2px;
    width: 100%;
    cursor: pointer;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
  }

  .login_registerButton {
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: darkgray;
    cursor: pointer;
  }
`;
