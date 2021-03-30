import React from "react";
import Product from "./Product";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeBody>
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home_row firstRow">
          <Product
            key={1}
            className="home_product"
            id={1}
            title="New Apple MacBook Air with Apple M1 Chip (13-inch, 8GB RAM, 512GB SSD Storage) - Silver (Latest Model)"
            image="https://images-na.ssl-images-amazon.com/images/I/71TPda7cwUL._AC_SX425_.jpg"
            price={1245.99}
            rating={5}
          />
          <Product
            key={2}
            className="home_product"
            id={2}
            title="New Apple iPhone 12 Pro Max (128GB, Graphite)"
            price={1238.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/71XXJC7V8tL._FMwebp__.jpg"
          />
        </div>
        <div className="home_row">
          <Product
            key={3}
            className="home_product"
            id={3}
            title="New Apple Watch SE (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band"
            price={239.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71nw%2BMRGq3L._AC_SX425_.jpg"
          />
          <Product
            key={4}
            className="home_product"
            id={4}
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            key={5}
            className="home_product"
            id={5}
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>
        <div className="home_row">
          <Product
            key={6}
            className="home_product"
            id={6}
            title="Sony Z8H 75 Inch TV: 8K Ultra HD Smart LED TV with HDR and Alexa Compatibility - 2020 Model with HT-G700 3.1CH Dolby Atmos/DTS:X Soundbar"
            price={4999.98}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6189TONa6EL._AC_SY355_.jpg"
          />
        </div>
      </div>
    </HomeBody>
  );
};

export default Home;

const HomeBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  .home_image {
    width: 100%;
    z-index: -1;
    margin-bottom: -180px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  .home_row {
    display: flex;
    z-index: 1;
    margin-left: 5px;
    margin-right: 5px;
  }

  .firstRow {
    overflow-x: auto;
  }
`;
