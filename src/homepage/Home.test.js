import { render, act, fireEvent } from "@testing-library/react";
import Home from "./Home";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";
import { MemoryRouter } from "react-router-dom";

const store = createStore(rootReducer);

const reduxSpy = jest.spyOn(redux, "useSelector");

beforeEach(() => {
  reduxSpy.mockReturnValue({
    accountWasDeleted: false,
    recentSearches: [
      {
        city: "San Diego",
        image: "imageUrl",
        id: expect.any(String),
        scores: {},
      },
    ],
  });
});

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows alerts for accountWasDeleted", () => {
  act(() => {
    reduxSpy.mockReturnValue(true);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const alert = getByText("Your account has been deleted.");

    expect(alert).toBeInTheDocument();
  });
});

it("can delete recent searches", async () => {
  await act(async () => {
    reduxSpy.mockReturnValue([
      {
        city: "San Diego",
        image: "imageUrl",
        id: expect.any(String),
        scores: {},
      },
    ]);

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const clearButton = getByText("Clear");
    await fireEvent.click(clearButton);

    expect(store.getState()).toEqual({
      accountWasDeleted: false,
      recentSearches: [],
    });
  });
});
