import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { auth } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/user";
import styled from "styled-components";

function Header() {
  const user = useSelector((state) => state.users.user);
  const basket = useSelector((state) => state.baskets.basket);
  const dispatch = useDispatch();

  const handleAthentication = () => {
    if (user) {
      auth.signOut();
      dispatch(signOut());
    }
  };

  return (
    <HeaderBody>
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
                Hello {user ? `${user.name}` : "Guest"}
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
    </HeaderBody>
  );
}

export default Header;

const HeaderBody = styled.div`
  .header_container {
    height: 3.75rem;
    display: flex;
    flex-direction: row !important;
    align-items: center;
    background-color: #131921;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header_logo {
    width: 6.25rem;
    object-fit: contain;
    margin: 0 1.25rem;
    margin-top: 18px;
    cursor: pointer;
  }
  .header_search {
    display: flex;
    flex: 1;
    align-items: center;
  }
  .header_searchInput {
    height: 0.575rem;
    padding: 0.585rem;
    border: none;
    border-radius: 0;
    width: 100%;
    outline-width: 0;
  }
  .MuiSvgIcon-root {
    fill: currentColor;
    width: 1em;

    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
  }

  .header_searchIcon {
    height: 100%;
    padding: 0.125rem;
    background-color: #cd9042;
  }

  a {
    text-decoration: none;
  }

  .header_optionLineOne {
    font-size: 0.625rem;
  }
  .header_optionLineTwo {
    font-size: 0.8125rem;
    font-weight: 800;
  }

  .header_optionBasket {
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
  }

  .header_basketCount {
    margin: 0.625rem;
  }

  .header_nav {
    display: flex;
    justify-content: space-evenly;
  }

  .header_option {
    display: flex;
    flex-direction: column;
    margin-left: 0.625rem;
    margin-right: 0.625rem;
    color: white;
  }
`;
