import Neighborhood from "./Neighborhood";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";
import { MemoryRouter } from "react-router-dom";

const store = createStore(rootReducer);

const reduxSpy = jest.spyOn(redux, "useSelector");

beforeEach(() => {
  reduxSpy.mockReturnValue({
    city: "LA",
    image: "imageUrl",
    scores: {
      walkScore: { score: 10, description: "score" },
      bikeScore: { score: 10, description: "score" },
      transitScore: { score: 10, description: "score" },
    },
    id: expect.any(String),
  });
});

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Neighborhood />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Neighborhood />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
