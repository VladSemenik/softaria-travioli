import { useCallback, useMemo, useState } from "react";

export interface PaginationInput {
  page: number;
  pageLength: number;
  items: number;
}

export interface PaginationOutput {
  page: number;
  pages: number;
  onPrev: () => void;
  onNext: () => void;
  onPage: (page: number) => void;
}

export const usePagination = (initial: PaginationInput) => {
  const [page, setPage] = useState(initial.page);

  const pages = useMemo(() => {
    return Math.ceil(initial.items / initial.pageLength);
  }, [initial.items, initial.pageLength]);

  const onPrev = useCallback(() => {
    setPage((p) => {
      if (p === 0) {
        return p;
      }
      return p - 1;
    });
  }, []);

  const onNext = useCallback(() => {
    setPage((p) => {
      if (p === pages - 1) {
        return p;
      }
      return p + 1;
    });
  }, [pages]);

  return {
    page,
    pages,
    onPrev,
    onNext,
    onPage: setPage,
  };
};
