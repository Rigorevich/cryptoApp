import React from "react";
import { RootState, useAppSelector } from "../../store";

interface Props {
  id: string;
}

const assetPriceSelector = (id: string) => (state: RootState) =>
  state.assets.prices[id];

export const Price = React.memo<Props>(({ id }) => {
  const price = useAppSelector(assetPriceSelector(id));

  return <>{Number(price).toFixed(5)}</>;
});
