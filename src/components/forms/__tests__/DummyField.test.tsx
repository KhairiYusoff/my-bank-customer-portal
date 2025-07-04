import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

function DummyField() {
  return <div data-testid="dummy-field">Hello Dummy</div>;
}

describe("DummyField", () => {
  it("renders the dummy text", () => {
    render(<DummyField />);
    expect(screen.getByTestId("dummy-field")).toHaveTextContent("Hello Dummy");
  });
});
