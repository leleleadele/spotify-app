import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loadDataFromStorage from './utils/loadDataFromStorage';

interface AppState {
  favorites: { [id: string]: boolean };
  activeView: "search" | "favorites";
}

const initialState: AppState = {
  favorites:
    typeof window !== "undefined" ? loadDataFromStorage("favorites") : {},
  activeView: "search",
};

const appSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setActiveView(
      state: AppState,
      action: PayloadAction<"search" | "favorites">
    ) {
      state.activeView = action.payload;
    },
    addFavorite(state: AppState, action: PayloadAction<string>) {
      state.favorites[action.payload] = true;
    },
    removeFavorite(state: AppState, action: PayloadAction<string>) {
      delete state.favorites[action.payload];
    },
  },
});

export const { setActiveView, addFavorite, removeFavorite } = appSlice.actions;
export default appSlice.reducer;
