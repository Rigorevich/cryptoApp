import React from "react";
import "./TablePage.scss";
import usePagination from "../../../hooks/usePagination";
import HeaderTable from "./HeaderTable";
import Card from "./Card";
import { Asset } from "../../../models";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const contentPerPage = 20;

const Table = ({
  items,
  onClickCard,
  onClickButton,
}: {
  items: Asset[];
  onClickCard: Function;
  onClickButton: Function;
}) => {
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    totalPages,
  } = usePagination({
    contentPerPage,
    count: items.length,
  });

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
      <div className="table">
        <div className="table__header">
          <HeaderTable />
        </div>
        <div className="table__body">
          {items.slice(firstContentIndex, lastContentIndex).map((item) => {
            return (
              <Card
                item={item}
                key={item.id}
                onClickCard={onClickCard}
                onClickButton={onClickButton}
                hideHint={hideHint}
              />
            );
          })}
        </div>
        <div className="pagination">
          <p className="text">
            {page}/{totalPages}
          </p>
          <img
            onClick={prevPage}
            src="/img/arrow.png"
            alt="arrow"
            className="prev"
          />
          <img
            onClick={nextPage}
            src="/img/arrow.png"
            alt="arrow"
            className="next"
          />
        </div>
      </div>
    </>
  );
};

export default Table;
