import React from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import styled from "styled-components";

function Order({ order }) {
  return (
    <OrderBody>
      <div className="header">
        <div className="info">
          <h2>Order</h2>
          <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        </div>
        <div className="id">
          <p>
            <small>{`User ID : ${order.id}`}</small>
          </p>
        </div>
      </div>
      <div className="products">
        {order.data.basket?.map((item) => {
          const makeid = (length) => {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          };
          return (
            <CheckoutProduct
              key={makeid(10)}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton
            />
          );
        })}
      </div>
      <div className="footer">
        <CurrencyFormat
          renderText={(value) => (
            <h3 className="order__total">Order Total: {value}</h3>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    </OrderBody>
  );
}

export default Order;

const OrderBody = styled.div`
  padding: 40px;
  margin-bottom: 20px;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .products {
    max-height: 40rem;
    overflow-y: auto;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 2.5rem;
  }
`;
