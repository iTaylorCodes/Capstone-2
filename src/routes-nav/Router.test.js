import { render } from "@testing-library/react";
import Router from "./Router";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";

const store = createStore(rootReducer);

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
