import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch } from "react-redux";
import { addBasket } from "../features/baskets";
import styled from "styled-components";

function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const addToBasket = () => {
    dispatch(
      addBasket({
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      })
    );
  };
  return (
    <ProductBody>
      <div className="product_info">
        <p className="product_title">{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon className="star_icon" />
              </p>
            ))}
        </div>
      </div>
      <img loading="lazy" src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </ProductBody>
  );
}

export default Product;

const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 0.625rem;
  padding: 1.25rem;
  width: 100%;
  background-color: white;
  z-index: 1;
  transition: 100ms ease-in-out;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: scale(1.0085);
  }

  .product_rating {
    display: flex;
  }

  img {
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }

  button {
    background-color: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: black;
  }

  .product_price {
    margin-top: 5px;
  }

  .product_info {
    height: 100px;
    margin-bottom: 15px;
  }

  .star_icon {
    color: #f0c14b;
  }

  .product_info > .product_title {
    font-weight: 900;
  }
`;
