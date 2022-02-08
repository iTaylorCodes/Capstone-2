import { useState, useContext, useEffect } from "react";
import { HotelsApi } from "../api/api";
import UserContext from "../auth/UserContext";
import FavoriteHotelCard from "./FavoriteHotelCard";

/** Favorites List.
 *
 * Component dedicated to showing a list of the users favorited Hotels.
 *
 * Renders multiple HotelCard components,
 * passing in data from HotelsApi based on hotelIds saved by the user.
 *
 * Rendered at /favorites.
 */
const FavoritesList = () => {
  const { currentUser } = useContext(UserContext);
  const [favHotels, setFavHotels] = useState([]);
  const userFavs = currentUser.favoritedProperties;

  useEffect(() => {
    let isSubscribed = true;
    const fetchHotel = async () => {
      try {
        if (isSubscribed) {
          for (let val of userFavs) {
            const hotel = await HotelsApi.getHotel(val);
            setFavHotels([...favHotels, hotel]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchHotel();
    return () => (isSubscribed = false);
  }, [userFavs]);

  return (
    <div className="FavoritesList">
      <div className="container col-12 col-sm-9 col-md-8 col-lg-7">
        <div className="row mt-3 ms-1 me-1">
          <div className="col-12">
            <h1>Favorited Hotels</h1>
          </div>
        </div>
        {favHotels.length ? (
          <div className="row g-0 d-flex justify-content-center container">
            {favHotels.map((h) => {
              return (
                <div
                  className="col-10 col-sm-12 col-md-6 col-xxl-4"
                  key={h.pdpHeader.hotelId}
                >
                  <FavoriteHotelCard hotel={h} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h3 className="text-danger d-flex justify-content-center text-center">
              No Favorites Saved Yet.
            </h3>
            <p className="text-danger d-flex justify-content-center text-center">
              Try adding to your favorites after completing a neighborhood
              search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
