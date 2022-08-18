import React from "react";
import { useSelector } from "react-redux";

export const Price = React.memo(({ id, fix }) => {
  const price = useSelector((state) => state.assets.prices[id]);
  return <>{Number(price).toFixed(fix)}</>;
});
