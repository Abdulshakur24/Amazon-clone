import React from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "../Firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { signIn, signOut } from "../features/user";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const { KEY } = require("../Config");

const promise = loadStripe(KEY.publishableKey);

function App() {
  const dispatch = useDispatch();
  const unsubscribe = auth.onAuthStateChanged((userAuth) => {
    if (userAuth) {
      dispatch(
        signIn({
          uid: userAuth.uid,
          email: userAuth.email,
          name: userAuth.displayName,
        })
      );
    } else {
      dispatch(signOut);
    }
    return unsubscribe;
  });

  return (
    <Router>
      <AppBody>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
        </Switch>
      </AppBody>
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  margin: 0;
  padding: 0;
`;
