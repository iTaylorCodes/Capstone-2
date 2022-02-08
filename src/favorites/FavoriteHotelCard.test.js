import FavoriteHotelCard from "./FavoriteHotelCard";
import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";

const hotel = {
  pdpHeader: { hotelId: "12345" },
  propertyDescription: {
    name: "Tester Hotel",
    address: {
      cityName: "Los Angeles",
      fullAddress: "1234 Tester Way, Los Angeles, CA 12345",
    },
    starRating: "5",
  },
};

it("renders without crashing", () => {
  render(
    <UserProvider>
      <FavoriteHotelCard hotel={hotel} />
    </UserProvider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <UserProvider>
      <FavoriteHotelCard hotel={hotel} />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
