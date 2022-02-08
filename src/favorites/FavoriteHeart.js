import { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import { NeighborhoodApi } from "../api/api";

/** Favorites List.
 *
 * Heart component for add/removing hotelIds from user favorites.
 *
 * Rendered by HotelCard and FavoriteHotelCard components.
 */
const FavoriteHeart = ({ hotelId }) => {
  let { currentUser } = useContext(UserContext);
  if (!currentUser)
    currentUser = { favoritedProperties: [], notLoggedIn: true };
  const defaultState = currentUser.favoritedProperties.includes(hotelId);
  const [isFavorite, setIsFavorite] = useState(defaultState);
  const [errorMsg, setErrorMsg] = useState("");

  const setFav = async (e) => {
    if (currentUser.notLoggedIn) {
      setErrorMsg("Signup or Login to save your favorite hotels.");
      return;
    }
    await NeighborhoodApi.favoriteProperty(
      currentUser.username,
      parseInt(hotelId, 10)
    );
    setIsFavorite(true);
  };

  const removeFav = async (e) => {
    if (currentUser.notLoggedIn) {
      setErrorMsg("Signup or Login to save your favorite hotels.");
      return;
    }
    await NeighborhoodApi.unFavoriteProperty(
      currentUser.username,
      parseInt(hotelId, 10)
    );
    setIsFavorite(false);
  };

  return (
    <div
      className="FavoriteHeart d-flex justify-content-end"
      style={{ margin: "-5px" }}
    >
      {errorMsg ? (
        <span className="text-danger me-1 fw-light fs-6">{errorMsg}</span>
      ) : (
        ""
      )}
      <i
        className="fa fa-heart"
        style={{ color: isFavorite ? "#0275d8" : "", cursor: "pointer" }}
        onClick={isFavorite ? removeFav : setFav}
        data-testid="favHeart"
      ></i>
    </div>
  );
};

export default FavoriteHeart;
