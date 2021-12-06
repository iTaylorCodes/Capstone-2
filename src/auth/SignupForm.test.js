import { render, fireEvent } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows bootstrap style alerts", function () {
  const { getByText } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );

  const button = getByText("Signup");
  const res = fireEvent.click(button);

  expect(res).toBeTruthy();
});
