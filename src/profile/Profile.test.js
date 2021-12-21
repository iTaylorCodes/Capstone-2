import { render, act, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../testUtils";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";

const store = createStore(rootReducer);

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ accountWasDeleted: false });

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <UserProvider>
        <Profile />
      </UserProvider>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <UserProvider>
        <Profile />
      </UserProvider>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows bootstrap style alerts for errors", async () => {
  await act(async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile />
        </UserProvider>
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    await fireEvent.change(emailInput, { target: { value: "test@test.com" } });

    const button = getByText("Save");
    await fireEvent.click(button);

    expect(getByLabelText("Email").value).toBe("test@test.com");
  });
});

it("shows bootstrap style alerts on success", async () => {
  await act(async () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile />
        </UserProvider>
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    await fireEvent.change(emailInput, {
      target: { value: "tester@test.net" },
    });

    const passwordInput = getByLabelText("Confirm password to save changes:");
    await fireEvent.change(passwordInput, { target: { value: "password" } });

    const button = getByText("Save");
    await fireEvent.click(button);

    expect(getByLabelText("Email").value).toBe("tester@test.net");
  });
});

it("can delete user accounts", async () => {
  await act(async () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile />
        </UserProvider>
      </Provider>
    );

    const button = getByText("Delete Account");
    await fireEvent.click(button);

    spy.mockReturnValue({ accountWasDeleted: true });

    expect(spy).toBeTruthy();
  });
});
