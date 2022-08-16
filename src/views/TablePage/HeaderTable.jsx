import React from "react";
import styles from "./TablePage.module.scss";

const HeaderTable = () => {
  return (
    <div className={styles.header__row}>
      <div className={styles.header__col}>Rank</div>
      <div className={styles.header__col}>Name</div>
      <div className={styles.header__col}>Price</div>
      <div className={styles.header__col}>Market Cup</div>
      <div className={styles.header__col}>VWAP(24hr)</div>
      <div className={styles.header__col}>Supply</div>
      <div className={styles.header__col}>Volume(24hr)</div>
      <div className={styles.header__col}>Change(24hr)</div>
      <div className={styles.header__col}></div>
    </div>
  );
};

export default HeaderTable;
