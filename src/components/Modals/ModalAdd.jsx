import React from "react";
import "./Modals.scss";
import { abbreviateNumber } from "../../utils/utils";
import { Price } from "../../store/Price";

const ModalAdd = ({ item, isOpen = false, onClose, onClickButton }) => {
  const [value, setValue] = React.useState("");

  function onBtn() {
    if (Number(value)) {
      onClickButton({ ...item, value });
      onClose();
    }
  }

  const keydownHandler = ({ key }) => {
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
    <div className="modal" onClick={onClose}>
      <div className="modal_dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal_header">
          <h3 className="modal_title">{item.name}</h3>
          <span className="modal_close" onClick={onClose}>
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
                Market Cup: ${abbreviateNumber(item.marketCapUsd)}
              </span>
              <span className="modal__price">
                Price: $<Price id={item.id} fix={5} />
              </span>
            </div>
            <div className="modal__data">
              <input
                className="modal__input"
                placeholder="Write here..."
                type="number"
                min="0"
                onChange={(event) => setValue(event.target.value)}
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
