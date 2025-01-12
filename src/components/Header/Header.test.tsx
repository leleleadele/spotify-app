import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "@/components/Header";
import { setupMockStore } from '@/utils/testUtils';

describe("Header Component", () => {
  it("should render the navigation buttons", () => {
    const store = setupMockStore({
      spotify: { activeView: "search" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Meklēt")).toBeInTheDocument();
    expect(screen.getByText("Izlase")).toBeInTheDocument();
  });

  it("should highlight the active view button", () => {
    const store = setupMockStore({
      spotify: { activeView: "favorites" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const searchButton = screen.getByText("Meklēt");
    const favoritesButton = screen.getByText("Izlase");

    expect(searchButton).not.toHaveClass("active");
    expect(favoritesButton).toHaveClass("active");
  });

  it("should dispatch setActiveView with 'search' when 'Meklēt' is clicked", () => {
    const store = setupMockStore({
      spotify: { activeView: "favorites" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const searchButton = screen.getByText("Meklēt");
    fireEvent.click(searchButton);

    expect(store.getState().spotify.activeView).toBe("search");
  });

  it("should dispatch setActiveView with 'favorites' when 'Izlase' is clicked", () => {
    const store = setupMockStore({
      spotify: { activeView: "search" },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const favoritesButton = screen.getByText("Izlase");
    fireEvent.click(favoritesButton);

    expect(store.getState().spotify.activeView).toBe("favorites");
  });
});
