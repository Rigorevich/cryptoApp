import React from "react";
import { fetchAssets, updatePrices } from "../store/assets/actions";
import { useAppDispatch, useAppSelector } from "../store";

const useSocket = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  React.useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    ws.onmessage = function (msg) {
      try {
        const parsedPrices = JSON.parse(msg.data);

        dispatch(updatePrices(parsedPrices));
      } catch (e) {
        console.log(e);
      }
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return useAppSelector((state) => state.assets.items);
};

export default useSocket;
