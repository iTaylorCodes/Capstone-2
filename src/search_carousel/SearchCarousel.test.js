import SearchesCarousel from "../search_carousel/SearchesCarousel";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", () => {
  const recentSearches = [
    {
      city: "Los Angeles, CA",
      image:
        "https://a.cdn-hotels.com/gdcs/production65/d1094/007d42a5-84e4-418e-a07d-a020fe670a43.jpg?impolicy=fcrop&w=800&h=533&q=medium",
      id: "test-id",
    },
    {
      city: "San Diego, CA",
      image:
        "https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/images/hero_media_image/2016-11/Hero_San%20Diego%20Skyline_John%20Bahu.jpg?h=3767f04f&itok=R32qq4Na",
      id: "test-id2",
    },
  ];

  render(
    <MemoryRouter>
      <SearchesCarousel recentSearches={recentSearches} />
    </MemoryRouter>
  );
});

it("matches snapshot", () => {
  const recentSearches = [
    {
      city: "Los Angeles, CA",
      image:
        "https://a.cdn-hotels.com/gdcs/production65/d1094/007d42a5-84e4-418e-a07d-a020fe670a43.jpg?impolicy=fcrop&w=800&h=533&q=medium",
      id: "test-id",
    },
    {
      city: "San Diego, CA",
      image:
        "https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/images/hero_media_image/2016-11/Hero_San%20Diego%20Skyline_John%20Bahu.jpg?h=3767f04f&itok=R32qq4Na",
      id: "test-id2",
    },
  ];

  const { asFragment } = render(
    <MemoryRouter>
      <SearchesCarousel recentSearches={recentSearches} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
