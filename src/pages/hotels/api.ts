import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Hotel } from "../../types";

interface HotelsSearchQuery {
  city?: string;
  page: number;
  pageSize: number;
}

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getAllHotels: builder.query<Hotel[], void>({
      query: () => `hotels.json`,
    }),
    getHotels: builder.query<
      { data: Hotel[]; length: number },
      HotelsSearchQuery
    >({
      query: () => `hotels.json`,
      transformResponse: (
        baseQueryReturnValue: Hotel[],
        meta,
        { city, page, pageSize }
      ) => {
        let hotels = baseQueryReturnValue;

        if (city) {
          hotels = baseQueryReturnValue.filter(
            (e) => e.city.toLocaleLowerCase() === city.toLocaleLowerCase()
          );
        }

        return {
          data: hotels.slice(page * pageSize, page * pageSize + pageSize),
          length: hotels.length,
        };
      },
    }),
  }),
});

export const { useGetAllHotelsQuery, useGetHotelsQuery } = hotelApi;
