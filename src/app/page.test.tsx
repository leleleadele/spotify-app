import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "@/store/slices/spotifySlice";
import Home from "@/app/page";

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      spotify: spotifyReducer,
    },
    preloadedState,
  });

jest.mock("@/components/SearchPanel", () => () => <div>Mocked SearchPanel</div>);
jest.mock("@/components/FavoritesPanel", () => () => (
  <div>Mocked FavoritesPanel</div>
));
jest.mock("@/components/Header", () => () => <div>Mocked Header</div>);

describe("Home Component", () => {
  it("renders the Header, SearchPanel, and FavoritesPanel when isClient is true", async () => {
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
        <Home />
      </Provider>
    );

    // Wait for `useEffect` to set `isClient` to true
    await waitFor(() => {
      expect(screen.getByText("Mocked Header")).toBeInTheDocument();
      expect(screen.getByText("Mocked SearchPanel")).toBeInTheDocument();
      expect(screen.getByText("Mocked FavoritesPanel")).toBeInTheDocument();
    });
  });

  it("applies the correct styles when activeView is 'favorites'", async () => {
    const store = createTestStore({
      spotify: {
        searchResults: [],
        favorites: {},
        loading: { favorites: false, search: false },
        error: { favorites: null, search: null },
        activeView: "favorites",
      },
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Wait for `useEffect` to set `isClient` to true
    await waitFor(() => {
      expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    });

    // Assert that the 'favorites' class is applied
    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("showRight");
  });

  it("does not apply the 'showRight' class when activeView is 'search'", async () => {
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
        <Home />
      </Provider>
    );

    // Wait for `useEffect` to set `isClient` to true
    await waitFor(() => {
      expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    });

    // Assert that the 'showRight' class is not applied
    const mainElement = screen.getByRole("main");
    expect(mainElement).not.toHaveClass("showRight");
  });
});
