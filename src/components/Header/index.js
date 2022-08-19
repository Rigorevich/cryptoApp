import React, { useState } from "react";
import "./Header.scss";
import { Price } from "../../store/Price";
import ModalBriefcase from "../Modals/ModalBriefcase";
import { useSelector } from "react-redux";
import { growth } from "../../utils/utils";

const Header = ({ items = [], onClickCross, briefCase }) => {
  const prices = useSelector((state) => state.assets.prices);
  const [isOpen, setIsOpen] = useState(false);
  const [priceThen, setPriceThen] = useState(
    briefCase.reduce((acc, item) => acc + Number(item.priceUsd), 0)
  );
  const [priceNow, setPriceNow] = useState(priceThen);

  React.useEffect(() => {
    setPriceNow(
      briefCase.reduce(
        (acc, item) => acc + Number(prices[item.id] * item.value),
        0
      )
    );
  }, [prices]);

  React.useEffect(() => {
    setPriceThen(
      briefCase.reduce(
        (acc, item) => acc + Number(item.priceUsd * item.value),
        0
      )
    );
  }, [briefCase]);

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
            <span className="briefcase__price">{priceNow.toFixed(3)} USD</span>
            <span
              className="briefcase__difference"
              style={{
                color: `${
                  priceNow - priceThen <= 0
                    ? "rgb(244, 67, 54)"
                    : "rgb(24, 198, 131)"
                }`,
              }}
            >
              {(priceNow - priceThen).toFixed(3)}$
            </span>
            <span className="briefcase__change">
              ({priceThen ? growth(priceNow, priceThen, 2) : 0}
              %)
            </span>
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
