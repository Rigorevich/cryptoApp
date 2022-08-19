import React from "react";
import { RootState, useAppSelector } from "../../store";

interface PropsPrice {
  id: string;
}

interface PropsCommonPrice {
  id: string;
  value: string;
}

const assetPriceSelector = (id: string) => (state: RootState) =>
  state.assets.prices[id];

export const Price = React.memo<PropsPrice>(({ id }) => {
  const price = useAppSelector(assetPriceSelector(id));

  return <>{Number(price).toFixed(5)}</>;
});
