import React from "react";
import "./CryptoInfo.scss";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";
import {
  todayDate,
  labels,
  abbreviateNumber,
  fixedNumber,
} from "../../../utils/utils";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ModalAdd from "../../Modals/ModalAdd";

const CryptoInfo = ({ item, onClickButton }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cryptoHistory, isLoading] = useAxios({
      url: `https://api.coincap.io/v2/assets/${item.id}/history?interval=h1`,
    }),
    prices = [];
  if (!isLoading) {
    cryptoHistory.data.slice(0, 26).forEach((obj) => {
      prices.push(obj.priceUsd);
    });
  }

  return (
    <>
      <div className="crypto_coin">
        <div className="crypto__info">
          <img
            src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
            alt="Logo"
            className="info__logo"
          />
          <div className="info__progress">
            <h3 className="progress__title">
              {item.name} ({item.symbol})
            </h3>
            <span className="progress__date">{todayDate()}</span>
          </div>
          <div className="info__prices">
            <div className="prices__high_low">
              <span className="prices__high">
                MARKET CUP: ${abbreviateNumber(item.marketCapUsd)}
              </span>
              <span className="prices__low">
                VWAP(24hr): ${fixedNumber(item.vwap24Hr, 3)}
              </span>
            </div>
          </div>
          <div className="info__prices">
            <div className="prices__change_average">
              <span className="prices__average">
                SUPPLY: ${abbreviateNumber(item.supply)}
              </span>
              <span className="prices__change">
                CHANGE: ${fixedNumber(item.changePercent24Hr, 2)}%
              </span>
            </div>
          </div>
        </div>
        {isLoading ? (
          <></>
        ) : (
          <div className="crypto__chart">
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
        <Link to="/" className="button__back">
          <button className="back">Вернуться назад</button>
        </Link>
        <div className="button__add">
          <button className="add" onClick={() => setIsOpen(true)}>
            Добавить в кошелёк
          </button>
        </div>
      </div>
      <ModalAdd
        item={item}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onClickButton={onClickButton}
      />
    </>
  );
};

export default CryptoInfo;
