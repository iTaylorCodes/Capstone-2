import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "./NavBar";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders without crashing after login", function () {
  const { container, getByText } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );

  // Tests post login event
  const button = getByText("Login");
  fireEvent.click(button);
  expect(
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
  ).toBeTruthy();
});
