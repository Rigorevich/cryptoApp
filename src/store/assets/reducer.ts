import { createReducer } from "@reduxjs/toolkit";
import { fetchAssets, updatePrices } from "./actions";
import { Asset } from "../../models";

interface AssetsState {
  items: Asset[];
  prices: Record<string, number>;
}

const initialState: AssetsState = {
  items: [],
  prices: {},
};

export const assetsReducer = createReducer<AssetsState>(
  initialState,
  (builder) => {
    builder.addCase(fetchAssets.fulfilled, (draft, { payload: items }) => {
      draft.items = items;
      draft.prices = items.reduce((acc, item) => {
        acc[item.id] = Number(item.priceUsd);

        return acc;
      }, {} as Record<string, number>);
    });

    builder.addCase(updatePrices, (draft, { payload }) => {
      draft.prices = { ...draft.prices, ...payload };
    });
  }
);
