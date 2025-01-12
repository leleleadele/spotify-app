import { render, screen } from "@testing-library/react";
import HorizontalLoader from "@/components/HorizontalLoader";

describe("HorizontalLoader Component", () => {
  it("should render the loader container", () => {
    render(<HorizontalLoader />);
    
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("loader");
  });

  it("should render the loader bar", () => {
    render(<HorizontalLoader />);
    
    const bar = screen.getByTestId("loader").querySelector(".bar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveClass("bar");
  });
});
