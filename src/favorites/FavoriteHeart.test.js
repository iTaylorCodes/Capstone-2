import FavoriteHeart from "./FavoriteHeart";
import { render, fireEvent, act } from "@testing-library/react";
import { UserProvider } from "../testUtils";

const hotelId = "12345";

it("renders without crashing", () => {
  render(
    <UserProvider>
      <FavoriteHeart hotelId={hotelId} />
    </UserProvider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <UserProvider>
      <FavoriteHeart hotelId={hotelId} />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("updates database on click", async () => {
  await act(async () => {
    const { getByTestId } = render(
      <UserProvider>
        <FavoriteHeart hotelId={hotelId} />
      </UserProvider>
    );

    const heart = getByTestId("favHeart");

    expect(heart).toHaveStyle({
      color: "#0275d8",
      cursor: "pointer",
    });

    await fireEvent.click(heart);

    expect(getByTestId("favHeart")).toHaveStyle({
      cursor: "pointer",
    });

    await fireEvent.click(heart);

    expect(getByTestId("favHeart")).toHaveStyle({
      color: "#0275d8",
      cursor: "pointer",
    });
  });
});
