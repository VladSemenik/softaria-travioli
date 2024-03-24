import { configureStore } from "@reduxjs/toolkit";
import { hotelApi } from "./pages/hotels/api";
import { destinationsApi } from "./pages/main/api";
import searchReducer from "./pages/main/store";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = {
  search: persistReducer(persistConfig, searchReducer),
  [destinationsApi.reducerPath]: destinationsApi.reducer,
  [hotelApi.reducerPath]: hotelApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(destinationsApi.middleware)
      .concat(hotelApi.middleware),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
