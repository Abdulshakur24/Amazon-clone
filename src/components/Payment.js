import React, { useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { db } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { emptyBasket } from "../features/baskets";
import styled from "styled-components";

function Payment() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const basket = useSelector((state) => state.baskets.basket);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    fetch(
      `/payment/create/${getBasketTotal(basket).toFixed(2) * 100}/${
        user.email
      }`,
      {
        method: "POST",
      }
    )
      .then(async (response) => {
        const secret = await response.json();
        await fetch(`payment/confirm/${secret.paymentIntent.id}`, {
          method: "POST",
        }).then(async (data) => {
          await stripe.confirmCardPayment(secret.paymentIntent.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          });
          const paymentIntent = await data.json();
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch(emptyBasket());
          history.replace("/orders");
        });
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <PaymentBody>
      {user ? (
        <div className="payment__container">
          <div className="payment_header">
            <h1>
              Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            <h1>
              Total: $
              {basket
                .reduce((amount, item) => item.price + amount, 0)
                .toLocaleString()}
            </h1>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>123 React Lane</p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="SignInToPurchase">
          <h1>Please sign in to start purchasing goods</h1>
        </div>
      )}
    </PaymentBody>
  );
}

export default Payment;

const PaymentBody = styled.div`
  background-color: white;
  .payment__container > .payment_header {
    text-align: center;
    padding: 10px;
    font-weight: 400;
    background-color: rgb(234, 237, 237);
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
  }

  .payment__container > h1 a {
    text-decoration: none;
  }

  .payment__section {
    display: flex;
    padding: 20px;
    margin: 0 20px;
    border-bottom: 1px solid lightgray;
  }

  .payment__title {
    flex: 0.2;
  }

  .payment__address,
  .payment__items,
  .payment__details {
    flex: 0.8;
  }

  .payment__items {
    height: 500px;
    overflow-y: auto;
  }

  .payment__details > form {
    max-width: 400px;
  }

  .payment__details > h3 {
    padding-bottom: 20px;
  }

  .payment__details > form > div > button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    font-weight: bolder;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }

  .SignInToPurchase {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
