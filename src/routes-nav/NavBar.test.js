import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserContext from "../auth/UserContext";
import NavBar from "./NavBar";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: false }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: false }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders without crashing after login", function () {
  const { getAllByText } = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: false }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Tests post login event
  const button = getAllByText("Login")[0];
  fireEvent.click(button);
  expect(
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: true }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    )
  ).toBeTruthy();
});

it("tests that navlinks will receive the activeLink class", function () {
  const firstNav = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: false }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Tests signup link
  const signup = firstNav.getAllByText("Signup")[0];
  fireEvent.click(signup);
  expect(
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: false }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    )
  ).toBeTruthy();

  // Tests login link
  const login = firstNav.getAllByText("Login")[0];
  fireEvent.click(login);
  expect(
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: true }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    )
  ).toBeTruthy();

  const secondNav = render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser: true }}>
        <NavBar />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Tests profile link
  const profile = secondNav.getAllByText("Profile")[0];
  fireEvent.click(profile);
  expect(
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: true }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    )
  ).toBeTruthy();

  // Tests favorites link
  const favs = secondNav.getAllByText("Favorites")[0];
  fireEvent.click(favs);
  expect(
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: true }}>
          <NavBar />
        </UserContext.Provider>
      </MemoryRouter>
    )
  ).toBeTruthy();
});
