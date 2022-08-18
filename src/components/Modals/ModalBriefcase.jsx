import React from "react";
import "./Modals.scss";
import { Price } from "../../store/Price";

const ModalBriefcase = ({
  isOpen = false,
  onClose,
  onClickCross,
  briefCase,
}) => {
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
          <h3 className="modal_title">Briefcase</h3>
          <span className="modal_close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal_body">
          <div className="modal_content">
            {briefCase.map((item) => {
              return (
                <div className="modal__card" key={item.id}>
                  <img
                    width={60}
                    height={60}
                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                    alt="Logo"
                    className="modal__logo"
                  />
                  <span className="modal__price">
                    $<Price id={item.id} fix={5} />
                  </span>
                  <span className="modal__number">
                    {item.value} {item.symbol}
                  </span>
                  <img
                    src="/img/cross.png"
                    width={20}
                    height={20}
                    alt="Cross"
                    className="modal__delete"
                    onClick={onClickCross}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBriefcase;
