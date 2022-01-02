import { render, fireEvent, act } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

const login = jest.fn();

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <LoginForm login={login} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LoginForm login={login} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows error alerts", async function () {
  await act(async () => {
    login.mockReturnValue({ success: false, errors: ["Failed login"] });
    const { getAllByText, getByRole } = render(
      <MemoryRouter>
        <LoginForm login={login} />
      </MemoryRouter>
    );

    const button = getAllByText("Login")[1];
    await fireEvent.click(button);

    const alert = getByRole("alert");
    expect(alert).toBeTruthy();
  });
});

it("changes input values using useFields hook", async function () {
  await act(async () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <LoginForm login={login} />
      </MemoryRouter>
    );

    const usernameInput = getByLabelText("Username");
    await fireEvent.change(usernameInput, {
      target: { value: "testuser" },
    });

    expect(getByLabelText("Username").value).toBe("testuser");
  });
});

it("reroutes on successful login", async function () {
  await act(async () => {
    login.mockReturnValue({ success: true });

    const { getAllByText } = render(
      <MemoryRouter>
        <LoginForm login={login} />
      </MemoryRouter>
    );

    const button = getAllByText("Login")[1];
    await fireEvent.click(button);
  });
});
