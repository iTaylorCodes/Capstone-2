import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../testUtils";
import { NeighborhoodApi } from "../api/api";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";

const store = createStore(rootReducer);
const logout = jest.fn();

const reduxSpy = jest.spyOn(redux, "useSelector");
reduxSpy.mockReturnValue({ accountWasDeleted: false });

const apiSpy = jest.spyOn(NeighborhoodApi, "updateProfile");
const deleteAccountSpy = jest.spyOn(NeighborhoodApi, "deleteProfile");

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <UserProvider>
        <Profile logout={logout} />
      </UserProvider>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <UserProvider>
        <Profile logout={logout} />
      </UserProvider>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows alerts for errors", async () => {
  await act(async () => {
    apiSpy.mockImplementation(() => {
      throw new Error("Failed update.");
    });

    const { getByText, getByLabelText, getByRole } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile logout={logout} />
        </UserProvider>
      </Provider>
    );

    const button = getByText("Save");
    await fireEvent.click(button);
  });
});

it("changes input values with handleChange func", async function () {
  await act(async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile logout={logout} />
        </UserProvider>
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    await fireEvent.change(emailInput, { target: { value: "test@test.com" } });

    expect(getByLabelText("Email").value).toBe("test@test.com");
  });
});

it("can delete user accounts", async () => {
  await act(async () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile logout={logout} />
        </UserProvider>
      </Provider>
    );

    const button = getByText("Delete Account");
    await fireEvent.click(button);

    reduxSpy.mockReturnValue({ accountWasDeleted: true });

    expect(reduxSpy).toBeTruthy();
  });
});

it("shows alerts when failing to delete user account", async () => {
  await act(async () => {
    deleteAccountSpy.mockImplementation(() => {
      throw new Error("Failed delete.");
    });

    const { getByText } = render(
      <Provider store={store}>
        <UserProvider>
          <Profile logout={logout} />
        </UserProvider>
      </Provider>
    );

    const button = getByText("Delete Account");
    await fireEvent.click(button);
  });
});
