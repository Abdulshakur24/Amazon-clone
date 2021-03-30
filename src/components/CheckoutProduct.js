import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { removeBasket } from "../features/baskets";
import styled from "styled-components";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const basket = useSelector((state) => state.baskets.basket);
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    const index = basket.findIndex((basketItem) => basketItem.id === id);
    if (index !== -1) {
      dispatch(removeBasket(index));
    }
  };

  return (
    <CheckoutProductBody>
      <img className="checkoutProduct__image" src={image} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon className="star_icon" />
              </p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </CheckoutProductBody>
  );
}

export default CheckoutProduct;

const CheckoutProductBody = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  .checkoutProduct__info {
    padding-left: 20px;
  }

  .checkoutProduct__info > button {
    cursor: pointer;
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }

  .checkoutProduct__image {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }

  .checkoutProduct__rating {
    display: flex;
  }

  .checkoutProduct__title {
    font-size: 17px;
    font-weight: 800;
  }

  .star_icon {
    color: #f0c14b;
  }
`;
