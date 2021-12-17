import { render, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
  render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("saves updated user data", function () {
  const { getAllByText } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );

  const button = getAllByText("Save")[0];
  const res = fireEvent.click(button);

  expect(res).toBeTruthy();
});

it("shows bootstrap style alerts", function () {
  const { getAllByText } = render(
    <UserProvider>
      <Profile />
    </UserProvider>
  );

  const emailInput = getAllByText("Email")[0].nextSibling;
  emailInput.value = "test@test.com";

  const button = getAllByText("Save")[0];
  const res = fireEvent.click(button);
  expect(res).toBeTruthy();
});
