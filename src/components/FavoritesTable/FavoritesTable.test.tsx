import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupMockStore } from "@/utils/testUtils";
import FavoritesTable from "@/components/FavoritesTable";
import { initialState } from "@/store/slices/spotifySlice";

jest.mock("@/utils/loadDataFromStorage", () => jest.fn(() => ["1", "2"]));

describe("FavoritesTable Component", () => {
  const mockFavoritesApiResponse = [
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
  ];

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        tracks: [
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
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches fetchFavoritesThunk and displays fetched favorites", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ tracks: mockFavoritesApiResponse }),
    });

    const store = setupMockStore({
      spotify: {
        ...initialState,
        favorites: {},
        loading: { favorites: false },
      },
    });

    render(
      <Provider store={store}>
        <FavoritesTable />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Song 1")).toBeInTheDocument();
      expect(screen.getByText("Test Song 2")).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/tracks?ids=1,2");
  });

  it("handles API failure gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    const store = setupMockStore({
      spotify: {
        ...initialState,
        favorites: {},
        loading: { favorites: false },
        error: { favorites: null },
      },
    });

    render(
      <Provider store={store}>
        <FavoritesTable />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().spotify.error.favorites).toBe(
        "Failed to fetch favorite tracks"
      );
    });
  });
});
