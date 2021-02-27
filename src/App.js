import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51I5tFfIlxVBlkyARgDg3mOEpnvAmhDf7QOqr4byEKxY6mcUdFQTacv7lO5dkFxUi746PymVZcDKZoFmkXILDy0k400RZTxoFoZ"
);

function App() {
  const [{}, dispatch] = useStateValue();
  const [on, setOn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(`The user is >>> ${authUser}`);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
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
          <Route path="/">
            <Header on={on} setOn={setOn} />
            <Home on={on} setOn={setOn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
