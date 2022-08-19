import React, { useState } from "react";
import "./Header.scss";
import { Price } from "../Price";
import ModalBriefcase from "../Modals/ModalBriefcase";
import { growth } from "../../utils/utils";
import { Asset } from "../../models";
import { useAppSelector } from "../../store";
import { Link } from "react-router-dom";

const Header = ({
  items,
  onClickCross,
  briefCase,
}: {
  items: Asset[];
  onClickCross: Function;
  briefCase: Asset[];
}) => {
  const prices = useAppSelector((state) => state.assets.prices);
  const [isOpen, setIsOpen] = useState(false);
  const [priceThen, setPriceThen] = useState<number>(
    briefCase.reduce((acc, item) => acc + Number(item.priceUsd), 0)
  );
  const [priceNow, setPriceNow] = useState<number>(priceThen);

  React.useEffect(() => {
    setPriceNow(
      briefCase.reduce(
        (acc, item) => acc + Number(prices[item.id] * Number(item.value)),
        0
      )
    );
  }, [prices]);

  React.useEffect(() => {
    setPriceThen(
      briefCase.reduce(
        (acc, item) => acc + Number(item.priceUsd) * Number(item.value),
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
          <div className="briefcase__info">
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
          </div>
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

const TopCrypto = ({ item }: { item: Asset }) => {
  return (
    <li className="crypto__item">
      <a href="#" className="crypto__link">
        <img
          height={30}
          width={30}
          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
          className="crypto__logo"
          alt=""
        />
        <div className="crypto__border">
          <span className="crypto__symbol">{item.symbol}</span>
          <span className="crypto__price">{<Price id={item.id} />}$</span>
        </div>
      </a>
    </li>
  );
};

export default Header;
