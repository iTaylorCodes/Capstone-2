import FavoritesList from "./FavoritesList";
import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";
import { HotelsApi } from "../api/api";

const hotels = [
  {
    pdpHeader: { hotelId: "12345" },
    propertyDescription: {
      name: "Tester Hotel",
      address: {
        cityName: "Los Angeles",
        fullAddress: "1234 Tester Way, Los Angeles, CA 12345",
      },
    },
    starRating: "5",
  },
];

const hotelSpy = jest.spyOn(HotelsApi, "getHotel");
hotelSpy.mockReturnValue(hotels);

it("renders without crashing", () => {
  render(
    <UserProvider>
      <FavoritesList />
    </UserProvider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <UserProvider>
      <FavoritesList />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
