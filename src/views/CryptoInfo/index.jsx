import React from "react";
import styles from "./CryptoInfo.module.scss";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import {
  todayDate,
  labels,
  abbreviateNumber,
  fixedNumber,
} from "../../utils/utils";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const CryptoInfo = ({ item, onClickButton }) => {
  const [cryptoHistory, error, isLoading] = useAxios({
      url: `https://api.coincap.io/v2/assets/${item.id}/history?interval=h1`,
    }),
    prices = [];
  if (!isLoading) {
    cryptoHistory.data.slice(0, 26).forEach((obj) => {
      prices.push(obj.priceUsd);
    });
  }
  console.log(prices, isLoading);
  return (
    <div className={styles.crypto}>
      <div className={styles.crypto__info}>
        <img
          src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
          alt="Logo"
          className={styles.info__logo}
        />
        <div className={styles.info__progress}>
          <h3 className={styles.progress__title}>
            {item.name} ({item.symbol})
          </h3>
          <span className={styles.progress__date}>{todayDate()}</span>
        </div>
        <div className={styles.info__prices}>
          <div className={styles.prices__high_low}>
            <span className={styles.prices__high}>
              MARKET CUP: ${abbreviateNumber(item.marketCapUsd)}
            </span>
            <span className={styles.prices__low}>
              VWAP(24hr): ${item.vwap24Hr}
            </span>
          </div>
        </div>
        <div className={styles.info__prices}>
          <div className={styles.prices__change_average}>
            <span className={styles.prices__average}>
              SUPPLY: ${abbreviateNumber(item.supply)}
            </span>
            <span className={styles.prices__change}>
              CHANGE: ${fixedNumber(item.changePercent24Hr, 2)}%
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div className={styles.crypto__chart}>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Сhanges per day",
                  data: prices,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
      )}
      <Link to="/" className={styles.button__back}>
        <button className={styles.back}>Вернуться назад</button>
      </Link>
      <div className={styles.button__add}>
        <button className={styles.add} onClick={onClickButton}>
          Добавить в кошелёк
        </button>
      </div>
    </div>
  );
};

export default CryptoInfo;
