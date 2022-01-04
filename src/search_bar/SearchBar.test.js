import SearchBar from "../search_bar/SearchBar";
import { render, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";
import { MemoryRouter } from "react-router-dom";

const store = createStore(rootReducer);

const setSearchError = jest.fn();

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar setSearchError={setSearchError} />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchBar setSearchError={setSearchError} />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("resets searchbar value", async () => {
  await act(async () => {
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar setSearchError={setSearchError} />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = getByLabelText("Search City, State:");
    await fireEvent.change(searchInput, {
      target: { value: "Los Angeles, CA" },
    });

    expect(getByLabelText("Search City, State:").value).toBe("Los Angeles, CA");

    const button = getByTestId("search-button");
    await fireEvent.click(button);

    expect(getByLabelText("Search City, State:").value).toBe("");
  });
});
