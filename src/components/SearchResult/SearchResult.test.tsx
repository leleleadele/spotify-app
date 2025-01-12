import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchResult from "@/components/SearchResult";
import { setupMockStore } from "@/utils/testUtils";

describe("SearchResult Component", () => {
  it("adds a track to favorites when clicked", () => {
    const store = setupMockStore({
      spotify: { favorites: {} },
    });

    render(
      <Provider store={store}>
        <SearchResult
          data={{
            id: "1",
            name: "Test Song",
            // @ts-ignore
            album: { images: [] },
            artists: [],
          }}
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);

    expect(store.getState().spotify.favorites).toHaveProperty("1");
  });

  it("removes a track from favorites when clicked again", () => {
    const store = setupMockStore({
      spotify: { favorites: { "1": { id: "1", name: "Test Song" } } },
    });

    render(
      <Provider store={store}>
        <SearchResult
          data={{
            id: "1",
            name: "Test Song",
            // @ts-ignore
            album: { images: [] },
            artists: [],
          }}
        />
      </Provider>
    );

    const heartButton = screen.getByRole("button");
    fireEvent.click(heartButton);

    expect(store.getState().spotify.favorites).not.toHaveProperty("1");
  });
});
