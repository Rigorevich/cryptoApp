import React from "react";
import "./TablePage.scss";

const HeaderTable = () => {
  return (
    <div className="header__row">
      <div className="header__col">Rank</div>
      <div className="header__col">Name</div>
      <div className="header__col">Price</div>
      <div className="header__col">Market Cup</div>
      <div className="header__col">VWAP(24hr)</div>
      <div className="header__col">Supply</div>
      <div className="header__col">Volume(24hr)</div>
      <div className="header__col">Change(24hr)</div>
      <div className="header__col"></div>
    </div>
  );
};

export default HeaderTable;
