import React from "react";
import "./CryptoInfo.scss";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";
import {
  abbreviateNumber,
  fixedNumber,
  labels,
  todayDate,
} from "../../../utils/utils";
import { Line } from "react-chartjs-2";
import ModalAdd from "../../Modals/ModalAdd";
import { Asset, PriceAsset } from "../../../models";
import { Chart, registerables } from "chart.js";
import { toast, ToastContainer } from "react-toastify";

Chart.register(...registerables);

const CryptoInfo = ({
  item,
  onClickButton,
}: {
  item: Asset;
  onClickButton: Function;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { response: cryptoHistory, isLoading } = useAxios({
      url: `https://api.coincap.io/v2/assets/${item.id}/history?interval=h1`,
    }),
    prices: string[] = [];

  function hideHint(err: boolean) {
    if (err) {
      toast.error("You can not add negative numbers of coins!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Coins has been successfully added!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (!isLoading) {
    cryptoHistory?.data.slice(0, 26).forEach((obj: PriceAsset) => {
      prices.push(obj.priceUsd);
    });
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                MARKET CUP: ${abbreviateNumber(Number(item.marketCapUsd))}
              </span>
              <span className="prices__low">
                VWAP(24hr):{" "}
                {fixedNumber(item.vwap24Hr, 5)
                  ? `$${fixedNumber(item.vwap24Hr, 5)}`
                  : "-"}
              </span>
            </div>
          </div>
          <div className="info__prices">
            <div className="prices__change_average">
              <span className="prices__average">
                SUPPLY: ${abbreviateNumber(Number(item.supply))}
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
        hideHint={hideHint}
      />
    </>
  );
};

export default CryptoInfo;
