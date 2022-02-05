import HotelCardList from "./HotelCardList";
import { render } from "@testing-library/react";

const hotels = [
  {
    id: 634418464,
    name: "The Grand NYC",
    starRating: 2,
    neighbourhood: "NoMad",
    address: {
      streetAddress: "38 West 31st Street",
      locality: "New York",
      postalCode: "10001",
      region: "NY",
      countryName: "United States",
    },
  },
  {
    id: 634418464,
    name: "The Grand NYC",
    starRating: 2,
    neighbourhood: "NoMad",
    address: {
      streetAddress: "38 West 31st Street",
      locality: "New York",
      postalCode: "10001",
      region: "NY",
      countryName: "United States",
    },
  },
];

it("renders without crashing", () => {
  render(<HotelCardList hotels={hotels} />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<HotelCardList hotels={hotels} />);
  expect(asFragment()).toMatchSnapshot();
});
