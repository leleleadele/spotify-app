import { render, screen } from "@testing-library/react";
import EmptyMessage from ".";

describe("EmptyMessage Component", () => {
  it("displays the heading with the correct text", () => {
    render(<EmptyMessage />);
    const heading = screen.getByText("Izlasē nav nevienas dziesmas");
    expect(heading).toBeInTheDocument();
  });

  it("displays the instruction text", () => {
    render(<EmptyMessage />);
    const instruction = screen.getByText(
      "Sameklē dziesmu un atzīmē to ar sirsniņu, lai pievienotu izlasei"
    );
    expect(instruction).toBeInTheDocument();
  });

  it("renders the sparrow image with alt text", () => {
    render(<EmptyMessage />);
    const image = screen.getByAltText("sparrow");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/birdie-640.png");
  });

  it("applies the correct styles from the CSS module", () => {
    render(<EmptyMessage />);
    screen.getByTestId("empty-message");
    expect(screen.getByTestId("empty-message")).toHaveClass("emptyMessage");
  });
});
