import React from "react";

const usePagination = ({
  contentPerPage,
  count,
}: {
  contentPerPage: number;
  count: number;
}) => {
  const [page, setPage] = React.useState<number>(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    firstContentIndex,
    lastContentIndex,
    page,
  };
};

export default usePagination;
