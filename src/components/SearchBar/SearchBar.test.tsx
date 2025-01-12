import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("should render the input field and button", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      "Meklē pēc ieraksta, albuma vai izpildītāja vārda"
    );
    const button = screen.getByRole("button", { name: "Meklēt" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should update the input value when typing", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      "Meklē pēc ieraksta, albuma vai izpildītāja vārda"
    );

    fireEvent.change(input, { target: { value: "test query" } });
    expect(input).toHaveValue("test query");
  });

  it("should call onSearch with the query when the button is clicked", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      "Meklē pēc ieraksta, albuma vai izpildītāja vārda"
    );
    const button = screen.getByRole("button", { name: "Meklēt" });

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });

  it("should call onSearch with the query when Enter is pressed", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      "Meklē pēc ieraksta, albuma vai izpildītāja vārda"
    );

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });

  it("should not call onSearch if the query is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      "Meklē pēc ieraksta, albuma vai izpildītāja vārda"
    );
    const button = screen.getByRole("button", { name: "Meklēt" });

    fireEvent.change(input, { target: { value: "  " } });
    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
