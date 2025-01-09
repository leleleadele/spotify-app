import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  favorites: { [id: string]: boolean };
}

const initialState: AppState = {
  favorites: {},
};

const appSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addFavorite(state: AppState, action: PayloadAction<string>) {
      state.favorites[action.payload] = true;
    },
    removeFavorite(state: AppState, action: PayloadAction<string>) {
      delete state.favorites[action.payload];
    },
  },
});

export const { addFavorite, removeFavorite } = appSlice.actions;
export default appSlice.reducer;
