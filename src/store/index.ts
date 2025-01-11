import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice";
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
