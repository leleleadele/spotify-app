import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "@/store/slices/spotifySlice";
import SearchPanel from "@/components/SearchPanel";

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      spotify: spotifyReducer,
    },
    preloadedState,
  });

describe("SearchPanel Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the search panel", () => {
    const store = createTestStore({
      spotify: {
        searchResults: [],
        favorites: {},
        loading: { favorites: false, search: false },
        error: { favorites: null, search: null },
        activeView: "search",
      },
    });

    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>
    );

    expect(screen.getByText("Meklē dziesmu")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/meklē pēc ieraksta/i)).toBeInTheDocument();
  });

  it("dispatches fetchSearchResultsThunk and fetches data", async () => {
    const mockResponse = {
      tracks: {
        items: [
          {
            id: "1",
            name: "Test Song 1",
            album: { name: "Test Album 1" },
            artists: [{ name: "Test Artist 1" }],
          },
          {
            id: "2",
            name: "Test Song 2",
            album: { name: "Test Album 2" },
            artists: [{ name: "Test Artist 2" }],
          },
        ],
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const store = createTestStore({
      spotify: {
        searchResults: [],
        favorites: {},
        loading: { favorites: false, search: false },
        error: { favorites: null, search: null },
        activeView: "search",
      },
    });

    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/meklē pēc ieraksta/i);
    const searchButton = screen.getByRole("button", { name: /meklēt/i });

    fireEvent.change(searchInput, { target: { value: "Test Query" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/search?query=Test Query&offset=0&limit=10"
      );
      expect(store.getState().spotify.searchResults).toEqual(mockResponse.tracks.items);
    });

    expect(screen.getByText("Test Song 1")).toBeInTheDocument();
    expect(screen.getByText("Test Song 2")).toBeInTheDocument();
  });

  it("renders the loader when loading", () => {
    const store = createTestStore({
      spotify: {
        searchResults: [],
        favorites: {},
        loading: { favorites: false, search: true },
        error: { favorites: null, search: null },
        activeView: "search",
      },
    });

    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("handles fetch errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const store = createTestStore({
      spotify: {
        searchResults: [],
        favorites: {},
        loading: { favorites: false, search: false },
        error: { favorites: null, search: null },
        activeView: "search",
      },
    });

    render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/meklē pēc ieraksta/i);
    const searchButton = screen.getByRole("button", { name: /meklēt/i });

    fireEvent.change(searchInput, { target: { value: "Test Query" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/search?query=Test Query&offset=0&limit=10"
      );
      expect(store.getState().spotify.error.search).toBe("Failed to fetch search results");
    });

    expect(screen.queryByText("Test Song 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Song 2")).not.toBeInTheDocument();
  });
});
