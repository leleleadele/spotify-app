import { render, screen } from "@testing-library/react";
import Heading from "@/components/Heading";

describe("Heading Component", () => {
  it("should render an h1 tag with the correct text and class", () => {
    render(<Heading tag="h1">Test Heading 1</Heading>);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading 1");
    expect(heading).toHaveClass("h1");
  });

  it("should render an h2 tag with the correct text and class", () => {
    render(<Heading tag="h2">Test Heading 2</Heading>);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading 2");
    expect(heading).toHaveClass("h2");
  });

  it("should render an h3 tag with the correct text and class", () => {
    render(<Heading tag="h3">Test Heading 3</Heading>);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading 3");
    expect(heading).toHaveClass("h3");
  });

  it("should render an h4 tag with the correct text and class", () => {
    render(<Heading tag="h4">Test Heading 4</Heading>);

    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading 4");
    expect(heading).toHaveClass("h4");
  });

  it("should render a p tag with the correct text and class", () => {
    render(<Heading tag="p">Test Paragraph</Heading>);

    const paragraph = screen.getByText("Test Paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("p");
  });

  it("should default to a p tag if an invalid tag is provided", () => {
    render(
      // @ts-expect-error
      <Heading tag="invalid">Fallback to Paragraph</Heading>
    );

    const paragraph = screen.getByText("Fallback to Paragraph");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe("P");
  });
});
