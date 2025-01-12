import { render, screen } from "@testing-library/react";
import FavoritesPanel from ".";

jest.mock("../FavoritesTable", () => () => (
  <div data-testid="favorites-list">Mock FavoritesList</div>
));

describe("FavoritesPanel Component", () => {
  it("renders without crashing", () => {
    render(<FavoritesPanel />);
    const panel = screen.getByTestId("favorites-panel");
    expect(panel).toBeInTheDocument();
  });

  it("displays the heading with the correct text", () => {
    render(<FavoritesPanel />);
    const heading = screen.getByRole("heading", { name: "Tava īpašā izlase" });
    expect(heading).toBeInTheDocument();
  });

  it("renders the FavoritesList component", () => {
    render(<FavoritesPanel />);
    const favoritesList = screen.getByTestId("favorites-list");
    expect(favoritesList).toBeInTheDocument();
  });

  it("applies the correct styles from the CSS module", () => {
    render(<FavoritesPanel />);
    const panel = screen.getByTestId("favorites-panel");
    expect(panel).toHaveClass("favorites");
  });
});
