import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackObject } from "@/types";

interface SpotifyState {
  favorites: { [id: string]: TrackObject };
  loading: { favorites: boolean; search: boolean };
  error: { favorites: string | null; search: string | null };
  activeView: "search" | "favorites";
}

const initialState: SpotifyState = {
  favorites: {},
  loading: { favorites: false, search: false },
  error: { favorites: null, search: null },
  activeView: "search",
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setActiveView(
      state: SpotifyState,
      action: PayloadAction<"search" | "favorites">
    ) {
      state.activeView = action.payload;
    },
    addFavorite(
      state: SpotifyState,
      action: PayloadAction<TrackObject>
    ) {
      state.favorites[action.payload.id] = action.payload;
    },
    removeFavorite(
      state: SpotifyState,
      action: PayloadAction<string>
    ) {
      delete state.favorites[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.loading.favorites = true;
        state.error.favorites = null;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        let parsedData: Record<string, TrackObject> = {};

        action.payload?.forEach((track: TrackObject) => {
          parsedData[track.id] = track;
        });

        state.favorites = { ...state.favorites, ...parsedData };
        state.loading.favorites = false;
      })
      .addCase(fetchFavoritesThunk.rejected, (state, action) => {
        state.loading.favorites = false;
        state.error.favorites = action.payload as string;
      });
  },
});

export const fetchFavoritesThunk = createAsyncThunk(
  "favorites/fetchFavorites",
  async (favorites: string[], thunkAPI) => {
    try {
      if (favorites.length > 0) {
        const ids = favorites.join(",");
        const response = await fetch(`/api/tracks?ids=${ids}`);
        const data = await response.json();
        return data.tracks;
      }
      return [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to fetch favorite tracks");
    }
  }
);

export const { setActiveView, addFavorite, removeFavorite } =
  spotifySlice.actions;
export default spotifySlice.reducer;
