import { configureStore } from "@reduxjs/toolkit";
import { assetsReducer } from "./reducer";

const rootReducer = {
  assets: assetsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
