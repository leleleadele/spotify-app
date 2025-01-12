import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./slices/spotifySlice";
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
