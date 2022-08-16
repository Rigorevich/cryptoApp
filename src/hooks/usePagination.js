import React from "react";
import { fetchAssets } from "../store/actions";
import { useDispatch } from "react-redux/es/exports";

const usePagination = ({ TOTAL = 2000 }) => {
  const [pagination, setPagination] = React.useState({
    currentPage: 0,
    pageSize: 30,
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchAssets({
        limit: pagination.pageSize,
        offset: pagination.currentPage * pagination.pageSize,
      })
    );
  }, [dispatch, pagination.pageSize, pagination.currentPage]);

  const next = () => {
    setPagination((state) => {
      const isLastPage = Math.floor(TOTAL / 10) === state.currentPage;

      return isLastPage
        ? state
        : { ...state, currentPage: state.currentPage + 1 };
    });
  };

  const prev = () => {
    setPagination((state) => {
      return state.currentPage === 0
        ? state
        : { ...state, currentPage: state.currentPage - 1 };
    });
  };

  return {
    next,
    prev,
    pagination,
    TOTAL,
  };
};

export default usePagination;
