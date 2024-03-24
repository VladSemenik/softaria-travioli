import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Destination } from "../../types";

export const destinationsApi = createApi({
  reducerPath: "destinationsApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getDestinations: builder.query<Destination[], void>({
      query: () => `destinations.json`,
    }),
  }),
});

export const { useGetDestinationsQuery } = destinationsApi;
