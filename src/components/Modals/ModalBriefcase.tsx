import React from "react";
import "./Modals.scss";
import { Price } from "../Price";
import { Asset } from "../../models";
import { toast, ToastContainer } from "react-toastify";

const ModalBriefcase = ({
  isOpen = false,
  onClose,
  onClickCross,
  briefCase,
}: {
  isOpen: boolean;
  onClose: Function;
  onClickCross: Function;
  briefCase: Asset[];
}) => {
  const keydownHandler = ({ key }: { key: string }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  function onCross(item: Asset): void {
    onClickCross(item);
    toast.success("Coins has been deleted!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  React.useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isOpen ? null : (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="modal" onClick={() => onClose()}>
        <div className="modal_dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal_header">
            <h3 className="modal_title">Briefcase</h3>
            <span className="modal_close" onClick={() => onClose()}>
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
                      $<Price id={item.id} />
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
                      onClick={() => onCross(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalBriefcase;
