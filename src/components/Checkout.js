import React from "react";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Checkout() {
  const user = useSelector((state) => state.users.user);
  const basket = useSelector((state) => state.baskets.basket);
  return (
    <CheckoutBody>
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user ? user.email : "Guest"}</h3>
          <h2 className="checkout_title">Your shopping Basket</h2>
        </div>
        <div className="products">
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
      <div className="checkout_right">
        <Subtotal />
      </div>
    </CheckoutBody>
  );
}

export default Checkout;

const CheckoutBody = styled.div`
  height: 100vh;
  display: flex;
  padding: 20px;
  background-color: white;
  height: max-content;

  .checkout_ad {
    width: 100%;
    margin-bottom: 10px;
  }
  .checkout_title {
    margin-right: 20px;
    padding: 10px;
    border-bottom: 1px solid lightgray;
  }

  .checkout_left {
    .products {
      height: 24rem;
      overflow-y: auto;
    }
  }
`;
