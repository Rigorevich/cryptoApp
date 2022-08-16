import { createReducer } from "@reduxjs/toolkit";
import { fetchAssets, updatePrices } from "./actions";

const initialState = {
  items: [],
  prices: {},
};

export const assetsReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchAssets.fulfilled, (draft, { payload: items }) => {
    draft.items = items;
    draft.prices = items.reduce((acc, item) => {
      acc[item.id] = item.priceUsd;

      return acc;
    }, {});
  });

  builder.addCase(updatePrices, (draft, { payload }) => {
    draft.prices = { ...draft.prices, ...payload };
  });
});
