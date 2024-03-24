import { useEffect, useState } from "react";
import { useGetHotelsQuery } from "./api";
import { HotelCard } from "./hotel-card";
import { Pagination } from "../../components/pagination";
import { usePagination } from "../../hooks/pagination";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

const PAGE_SIZE = 10;

const HotelsPage = () => {
  const searchValues = useSelector((state: AppState) => state.search);
  const [hotels, setHotels] =
    useState<ReturnType<typeof useGetHotelsQuery>["data"]>();

  const pagination = usePagination({
    page: 0,
    pageLength: PAGE_SIZE,
    items: hotels?.length || 0,
  });
  const { data, isLoading, isError } = useGetHotelsQuery({
    city: searchValues.dest?.label,
    page: pagination.page,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    setHotels(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Hotels
      </h1>

      <Pagination {...pagination} />

      {isError ? (
        <p className="text-center text-lg text-gray-900 dark:text-white">
          Error occured
        </p>
      ) : isLoading ? (
        <p className="text-center text-lg text-gray-900 dark:text-white">
          Loading...
        </p>
      ) : !data?.length ? (
        <p className="text-center text-lg text-gray-900 dark:text-white">
          No data
        </p>
      ) : (
        <>
          {data.data.map((e, i) => (
            <HotelCard key={i} {...e} />
          ))}
        </>
      )}
    </div>
  );
};

export default HotelsPage;
