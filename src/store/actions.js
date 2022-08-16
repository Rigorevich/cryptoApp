import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAssets = createAsyncThunk(
  "assets/fetch",
  async ({ limit, offset }) => {
    const url = new URL("https://api.coincap.io/v2/assets");
    url.searchParams.set("limit", limit);
    url.searchParams.set("offset", offset);

    const response = await fetch(url.toString());

    const { data } = await response.json();

    return data;
  }
);

export const updatePrices = createAction("assets/updatePrices");
