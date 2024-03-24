import { createSlice } from "@reduxjs/toolkit";
import type { SearchQuery } from "./types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: SearchQuery = {
  dest: undefined,
  checkIn: undefined,
  checkOut: undefined,
  amountPeople: undefined,
};

export const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeSearch: (state, action: PayloadAction<SearchQuery>) => {
      state.dest = action.payload.dest;
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.amountPeople = action.payload.amountPeople;
    },
  },
});

export const { storeSearch } = searchReducer.actions;

export default searchReducer.reducer;
