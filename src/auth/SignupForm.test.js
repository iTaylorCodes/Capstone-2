import { render, fireEvent, act } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";

const signup = jest.fn();

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <SignupForm signup={signup} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <SignupForm signup={signup} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows error alerts", async function () {
  await act(async () => {
    signup.mockReturnValue({ success: false, errors: ["Failed signup"] });
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <SignupForm signup={signup} />
      </MemoryRouter>
    );

    const button = getByText("Signup");
    await fireEvent.click(button);

    const alert = getByRole("alert");
    expect(alert).toBeTruthy();
  });
});

it("changes input values using useFields hook", async function () {
  await act(async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignupForm signup={signup} />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    await fireEvent.change(emailInput, {
      target: { value: "testtest@test.com" },
    });

    expect(getByLabelText("Email").value).toBe("testtest@test.com");
  });
});

it("reroutes on successful signup", async function () {
  await act(async () => {
    signup.mockReturnValue({ success: true });

    const { getByText } = render(
      <MemoryRouter>
        <SignupForm signup={signup} />
      </MemoryRouter>
    );

    const button = getByText("Signup");
    await fireEvent.click(button);
  });
});
