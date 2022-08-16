import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchAssets, updatePrices } from "../store/actions";
import usePagination from "./usePagination";

const useSocket = () => {
  const { pagination } = usePagination({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchAssets({
        limit: pagination.pageSize,
        offset: pagination.currentPage * pagination.pageSize,
      })
    );
  }, [dispatch, pagination.pageSize, pagination.currentPage]);

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

  return useSelector((state) => state.assets.items);
};

export default useSocket;
