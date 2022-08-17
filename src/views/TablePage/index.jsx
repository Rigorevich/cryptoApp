import React from "react";
import "./TablePage.scss";
import usePagination from "../../hooks/usePagination";
import HeaderTable from "./HeaderTable";
import Card from "./Card";

const contentPerPage = 20;

const Table = ({ items, onClickCard }) => {
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

  return (
    <div className="table">
      <div className="table__header">
        <HeaderTable />
      </div>
      <div className="table__body">
        {items.slice(firstContentIndex, lastContentIndex).map((item) => {
          return <Card item={item} key={item.id} onClickCard={onClickCard} />;
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
  );
};

export default Table;
