import spotifySlice from "@/store/slices/spotifySlice";
import { configureStore } from "@reduxjs/toolkit";

export const setupMockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      spotify: spotifySlice,
    },
    preloadedState,
  });
