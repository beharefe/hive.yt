import "./Navbar.scss";
import React, { useState } from "react";

import NavMenu from "./NavMenu";
import Searchbar from "components/searchbar";
import Icon from "components/icon/Icon";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { push } = useHistory();

  return (
    <nav className="app-navbar">
      <div className="navbar-content">
        <NavMenu isOpen={menuOpen}>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </NavMenu>

        {/* Animated menu toggle button */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Icon type="close" /> : <Icon type="menu" />}
        </div>

        <div className="navbar-logo" onClick={() => push("/")}>
          <Icon type="hive" />
        </div>
        <div className="search-wrapper">
          <Searchbar isOpen={searchOpen} />
          <div
            className="search-toggle"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <Icon type="close" /> : <Icon type="search" />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
