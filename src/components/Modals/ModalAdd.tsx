import React from "react";
import "./Modals.scss";
import { abbreviateNumber } from "../../utils/utils";
import { Price } from "../Price";
import { Asset } from "../../models";

const ModalAdd = ({
  item,
  isOpen = false,
  onClose,
  onClickButton,
  hideHint,
}: {
  item: Asset;
  isOpen: boolean;
  onClose: Function;
  onClickButton: Function;
  hideHint: Function;
}) => {
  const [value, setValue] = React.useState<string>("");

  function onBtn(): void {
    if (Number(value)) {
      if (Number(value) >= 0) onClickButton({ ...item, value });
      onClose();
      hideHint(Number(value) < 0);
    }
  }

  function inputValidation(event: React.ChangeEvent<HTMLInputElement>): void {
    if (value.length <= 4) {
      setValue(event.target.value);
    }
  }

  const keydownHandler = ({ key }: { key: string }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isOpen ? null : (
    <div className="modal" onClick={() => onClose()}>
      <div className="modal_dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h3 className="modal_title">{item.name}</h3>
          <span className="modal_close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal_body">
          <div className="modal_content">
            <div className="modal__info">
              <img
                width={60}
                height={60}
                src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                alt="Logo"
                className="modal__logo"
              />
              <span className="modal__market">
                Market Cup: ${abbreviateNumber(Number(item.marketCapUsd))}
              </span>
              <span className="modal__price">
                Price: $<Price id={item.id} />
              </span>
            </div>
            <div className="modal__data">
              <input
                className="modal__input"
                placeholder="Write here..."
                type="number"
                min="0"
                onChange={inputValidation}
                value={value}
              />
              <button type="submit" className="modal__button" onClick={onBtn}>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
