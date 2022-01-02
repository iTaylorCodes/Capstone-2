import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";
import { UserProvider } from "./testUtils";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);

it("renders without crashing", function () {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
