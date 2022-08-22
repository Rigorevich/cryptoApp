import React from "react";
import { RootState, useAppSelector } from "../../store";

interface PropsPrice {
  id: string;
}

const assetPriceSelector = (id: string) => (state: RootState) =>
  state.assets.prices[id];

export const Price = React.memo<PropsPrice>(({ id }) => {
  const price: number = useAppSelector(assetPriceSelector(id));
  const strPrice: string =
    price >= 2 ? (+price).toFixed(2).toString() : (+price).toFixed(5);
  return <>{Number(strPrice)}</>;
});
