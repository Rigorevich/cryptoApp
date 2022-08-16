import React from "react";
import styles from "./Header.module.scss";
import { Price } from "../../store/Price";

const Header = ({ onClickCase, items = [] }) => {
  return (
    <header className={styles.header}>
      <ul className={styles.crypto}>
        {items.map((item) => {
          return <TopCrypto item={item} key={item.id} />;
        })}
      </ul>
      <div className={styles.briefcase} onClick={onClickCase}>
        <img
          height={30}
          width={30}
          src="/img/briefcase.svg"
          alt="Briefcase"
          className={styles.briefcase__logo}
        />
        <p className={styles.briefcase__info}>
          134,32 USD
          <span> +2,38 (1,80 %)</span>
        </p>
      </div>
    </header>
  );
};

const TopCrypto = ({ item }) => {
  return (
    <li className={styles.crypto__item}>
      <a href="/" className={styles.crypto__link}>
        <img
          height={30}
          width={30}
          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
          alt=""
        />
        <div className={styles.crypto__border}>
          <span>{item.symbol}</span>
          <span>{<Price id={item.id} fix={2} />}$</span>
        </div>
      </a>
    </li>
  );
};

export default Header;
