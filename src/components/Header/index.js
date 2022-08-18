import React, { useState } from "react";
import "./Header.scss";
import { Price } from "../../store/Price";
import { fixedNumber } from "../../utils/utils";
import ModalBriefcase from "../Modals/ModalBriefcase";
import { useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";

const Header = ({ items = [], onClickCross, briefCase, setBriefCase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pastPrice, setPastPrice] = useLocalStorage("pastPrice", sumOfPrices());
  const prices = useSelector((state) => state.assets.prices);

  // React.useEffect(() => {
  //   setBriefCase((prev) =>
  //     [...prev].map((item) =>
  //       prices[item.id] ? { ...item, priceUsd: prices[item.id] } : item
  //     )
  //   );
  // });

  function sumOfPrices() {
    return fixedNumber(
      briefCase.reduce((acc, el) => acc + Number(el.priceUsd), 0),
      4
    );
  }

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
            <span className="briefcase__price">{} USD</span>
            <span className="briefcase__difference">$</span>
            <span className="briefcase__change">(1,80 %)</span>
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
