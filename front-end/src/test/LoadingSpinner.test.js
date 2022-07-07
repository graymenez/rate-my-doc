import { render, screen } from "@testing-library/react";
import LoadSpinner from "../LoadingSpinner";

test("render LoadingSpinner Component", () => {
  render(<LoadSpinner />);
});
test("renders Loading Data text", () => {
  render(<LoadSpinner />);
  let text = screen.getByText("Loading Data..");
  expect(text).toBeInTheDocument();
});
