import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const ASSETS_URL = "https://api.coincap.io/v2/assets";

export const fetchAssets = createAsyncThunk("assets/fetch", async () => {
  const url = new URL(ASSETS_URL);

  const response = await fetch(url.toString());

  const { data } = await response.json();

  return data;
});

export const updatePrices = createAction("assets/updatePrices");
