import { render } from "@testing-library/react";
import Router from "./Router";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
