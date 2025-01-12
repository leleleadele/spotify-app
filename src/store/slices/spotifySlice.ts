import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loadDataFromStorage from "../../utils/loadDataFromStorage";

interface FavoritesBrowserState {
  favorites: { [id: string]: boolean };
  activeView: "search" | "favorites";
}

const initialState: FavoritesBrowserState = {
  favorites:
    typeof window !== "undefined" ? loadDataFromStorage("favorites") : {},
  activeView: "search",
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setActiveView(
      state: FavoritesBrowserState,
      action: PayloadAction<"search" | "favorites">
    ) {
      state.activeView = action.payload;
    },
    addFavorite(state: FavoritesBrowserState, action: PayloadAction<string>) {
      state.favorites[action.payload] = true;
    },
    removeFavorite(
      state: FavoritesBrowserState,
      action: PayloadAction<string>
    ) {
      delete state.favorites[action.payload];
    },
  },
});

export const { setActiveView, addFavorite, removeFavorite } =
  spotifySlice.actions;
export default spotifySlice.reducer;
