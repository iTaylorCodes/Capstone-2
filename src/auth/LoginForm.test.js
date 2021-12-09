import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows bootstrap style alerts", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  const button = getAllByText("Login")[1];
  const res = fireEvent.click(button);

  expect(res).toBeTruthy();
});
