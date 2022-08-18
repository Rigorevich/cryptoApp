import React, { useState } from "react";
import "./Header.scss";
import { Price } from "../../store/Price";
import ModalBriefcase from "../Modals/ModalBriefcase";

const Header = ({ items = [], onClickCross, briefCase }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="header">
        <ul className="crypto">
          {items.map((item) => {
            return <TopCrypto item={item} key={item.id} />;
          })}
        </ul>
        <div className="briefcase" onClick={() => setIsOpen(true)}>
          <img
            height={30}
            width={30}
            src="/img/briefcase.svg"
            alt="Briefcase"
            className="briefcase__logo"
          />
          <p className="briefcase__info">
            123,123 USD
            <span> +2,38 (1,80 %)</span>
          </p>
        </div>
      </header>
      <ModalBriefcase
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickCross={onClickCross}
        briefCase={briefCase}
      />
    </>
  );
};

const TopCrypto = ({ item }) => {
  return (
    <li className="crypto__item">
      <a href="/" className="crypto__link">
        <img
          height={30}
          width={30}
          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
          className="crypto__logo"
          alt=""
        />
        <div className="crypto__border">
          <span className="crypto__symbol">{item.symbol}</span>
          <span className="crypto__price">
            {<Price id={item.id} fix={2} />}$
          </span>
        </div>
      </a>
    </li>
  );
};

export default Header;
