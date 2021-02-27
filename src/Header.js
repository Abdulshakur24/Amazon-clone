import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { auth } from "./firebase";

function Header({ on, setOn }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <div className="header_container">
        <Link to="/">
          <img
            className="header_logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>
        <div className="header_search">
          <input
            className="header_searchInput"
            type="text"
            placeholder="Search"
          />
          <SearchIcon className="header_searchIcon" />
        </div>
        <div className="header_nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAthentication} className="header_option">
              <span className="header_optionLineOne">
                Hello {user ? `${user.email}` : "Guest"}
              </span>
              <span className="header_optionLineTwo">
                {user ? "Sign Out" : "Sign in"}
              </span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header_option">
              <span className="header_optionLineOne">Returns</span>
              <span className="header_optionLineTwo">& Orders</span>
            </div>
          </Link>
          <div className="header_option">
            <span className="header_optionLineOne hidden">Your</span>
            <span className="header_optionLineTwo hidden">Prime</span>
          </div>
          <a
            onClick={() => setOn(!on)}
            href="#"
            className={`header__toggle ${on ? "opened" : "closed"}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </a>
          <Link to="/checkout">
            <div className="header_optionBasket hide-for-mobile">
              <ShoppingBasketIcon />
              <span className="header_optionLineTwo header_basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      {on && (
        <div
          onClick={() => setOn(!on)}
          className="home_moblieOpenedMenu hide-for-desktop"
        >
          <Link to="/checkout">
            <div className="header_optionBasket">
              <ShoppingBasketIcon />
              <p className="header_optionLineTwo header_basketCount">
                {basket?.length}
              </p>
            </div>
          </Link>
          <div className="header_optionMobile">
            <p className="header_optionLineOne hidden">Your</p>
            <p className="header_optionLineTwo hidden">Prime</p>
          </div>
          <Link to="/orders">
            <div className="header_optionMobile">
              <p className="header_optionLineOne">Returns</p>
              <p className="header_optionLineTwo">& Orders</p>
            </div>
          </Link>
          <Link to={!user && "/login"}>
            <div
              onClick={handleAthentication}
              className="header_optionMobile hide"
            >
              <p className="header_optionLineOne" style={{ color: "white" }}>
                Hello
              </p>
              <p className="header_optionLineOne">
                {user ? `${user.email}` : "Guest"}
              </p>
              <p className="header_optionLineTwo">
                {user ? "Sign Out" : "Sign in"}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
