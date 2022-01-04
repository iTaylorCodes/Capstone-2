import Scores from "./Scores";
import { render } from "@testing-library/react";

let scores = {
  walkScore: { score: 10, description: "score" },
  bikeScore: { score: 10, description: "score" },
  transitScore: { score: 10, description: "score" },
};

it("renders without crashing", () => {
  render(<Scores scores={scores} />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Scores scores={scores} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders when scores are unavailable", () => {
  scores = {
    walkScore: { score: null, description: null },
    bikeScore: { score: null, description: null },
    transitScore: { score: null, description: null },
  };

  render(<Scores scores={scores} />);
});
