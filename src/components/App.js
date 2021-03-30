import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { signIn, signOut } from "../features/user";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const promise = loadStripe(
  "pk_test_51I5tFfIlxVBlkyARgDg3mOEpnvAmhDf7QOqr4byEKxY6mcUdFQTacv7lO5dkFxUi746PymVZcDKZoFmkXILDy0k400RZTxoFoZ"
);

function App() {
  const dispatch = useDispatch();
  const [on, setOn] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <Router>
      <AppBody>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header on={on} setOn={setOn} />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header on={on} setOn={setOn} />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header on={on} setOn={setOn} />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/" exact>
            <Header on={on} setOn={setOn} />
            <Home on={on} setOn={setOn} />
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
