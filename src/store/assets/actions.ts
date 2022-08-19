import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Asset } from "../../models";

const ASSETS_URL = "https://api.coincap.io/v2/assets";

export const fetchAssets = createAsyncThunk("assets/fetch", async () => {
  const url = new URL(ASSETS_URL);

  const response = await fetch(url.toString());

  const { data } = (await response.json()) as { data: Asset[] };

  return data;
});

export const updatePrices = createAction<Record<string, number>>(
  "assets/updatePrices"
);
