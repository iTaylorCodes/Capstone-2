import Score from "./Score";
import { render } from "@testing-library/react";

const score = { score: 10, description: "score" };

it("renders without crashing", () => {
  render(<Score score={score} />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Score score={score} />);
  expect(asFragment()).toMatchSnapshot();
});
