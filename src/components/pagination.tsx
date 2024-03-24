import { useCallback } from "react";
import type { PaginationOutput } from "../hooks/pagination";

export const Pagination = ({
  page,
  pages,
  onPrev,
  onNext,
  onPage,
}: PaginationOutput) => {
  const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      e.preventDefault();
      //@ts-expect-error
      onPage(+e.target.dataset.pageindex);
    },
    [onPage]
  );

  const handlePrev = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      e.preventDefault();
      onPrev();
    },
    [onPrev]
  );

  const handleNext = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      e.preventDefault();
      onNext();
    },
    [onNext]
  );

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            onClick={handlePrev}
            className="flex items-center justify-center px-3 w-20 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </a>
        </li>
        {new Array(pages).fill(null).map((e, i) => {
          if (i === page) {
            return (
              <li key={i}>
                <a
                  href="#"
                  aria-current="page"
                  data-pageindex={i}
                  onClick={handleClick}
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  {i + 1}
                </a>
              </li>
            );
          }
          return (
            <li key={i}>
              <a
                href="#"
                data-pageindex={i}
                onClick={handleClick}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {i + 1}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="#"
            onClick={handleNext}
            className="flex items-center justify-center px-3 w-20 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
