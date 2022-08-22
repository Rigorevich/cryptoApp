import React from "react";
import "./TablePage.scss";
import { Link } from "react-router-dom";
import { Price } from "../../Price";
import { abbreviateNumber, fixedNumber } from "../../../utils/utils";
import ModalAdd from "../../Modals/ModalAdd";
import { Asset } from "../../../models";

const Card = ({
  item,
  onClickCard,
  onClickButton,
  hideHint,
}: {
  item: Asset;
  onClickCard: Function;
  onClickButton: Function;
  hideHint: Function;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function onBtn(event: { preventDefault: () => void }): void {
    event.preventDefault();
    setIsOpen(true);
  }

  function onCard(): void {
    onClickCard(item);
  }

  return (
    <>
      <div className="body__row" onClick={onCard}>
        <Link to={`/coins/${item.id}`} className="body__link" onClick={onCard}>
          <div className="body__col">{item.rank}</div>
          <div className="body__col">
            <img
              height={30}
              width={30}
              src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
              alt="BTC"
            />
            <div>
              {item.name}
              <p>{item.symbol}</p>
            </div>
          </div>
          <div className="body__col">
            $<Price id={item.id} />
          </div>
          <div className="body__col">
            ${abbreviateNumber(Number(item.marketCapUsd))}
          </div>
          <div className="body__col">
            {fixedNumber(item.vwap24Hr, 5)
              ? `$${fixedNumber(item.vwap24Hr, 5)}`
              : "-"}
          </div>
          <div className="body__col">
            {abbreviateNumber(Number(item.supply))}
          </div>
          <div className="body__col">
            ${abbreviateNumber(Number(item.volumeUsd24Hr))}
          </div>
          <div
            className="body__col"
            style={{
              color: `${
                Number(item.changePercent24Hr) <= 0
                  ? "rgb(244, 67, 54)"
                  : "rgb(24, 198, 131)"
              }`,
            }}
          >
            {fixedNumber(item.changePercent24Hr, 2)}%
          </div>
          <div className="body__col">
            <img
              src="/img/plus.svg"
              alt="Plus"
              className="col__btn"
              onClick={onBtn}
            />
          </div>
        </Link>
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

export default Card;
