import { render } from "@testing-library/react";
import PrivateOutlet from "./PrivateOutlet";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import UserContext from "../auth/UserContext";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <PrivateOutlet />
      </UserProvider>
    </MemoryRouter>
  );

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: false }}>
        <PrivateOutlet />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PrivateOutlet />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
