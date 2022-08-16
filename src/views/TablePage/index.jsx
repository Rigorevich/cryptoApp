import React from "react";
import styles from "./TablePage.module.scss";
import usePagination from "../../hooks/usePagination";
import HeaderTable from "./HeaderTable";
import Card from "./Card";

const Table = ({ onClickButton, items, onClickCard }) => {
  const { next, prev, pagination, TOTAL } = usePagination({});
  const totalPage = Math.floor(TOTAL / 10) + 1;
  const currentPage = pagination.currentPage + 1;

  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        <HeaderTable />
      </div>
      <div className={styles.table__body}>
        {items.map((item) => {
          return (
            <Card
              onClickButton={onClickButton}
              item={item}
              key={item.id}
              onClickCard={onClickCard}
            />
          );
        })}
      </div>
      <div className={styles.pagination}>
        <p className={styles.text}>
          {currentPage}/{totalPage}
        </p>
        <img
          onClick={prev}
          src="/img/arrow.png"
          alt="arrow"
          className={styles.prev}
        />
        <img
          onClick={next}
          src="/img/arrow.png"
          alt="arrow"
          className={styles.next}
        />
      </div>
    </div>
  );
};

export default Table;
