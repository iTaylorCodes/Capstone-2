import { useEffect, useState } from "react";
import { PlacesApi } from "../api/api";
import FavoriteHeart from "../favorites/FavoriteHeart";

/** Favorite Hotel Card.
 *
 * Component to show a card with hotel details provided by HotelsAPI specific to use favorites.
 *
 * Renders -> Hotel ID, Name, Image, Star Rating, Neighborhood, and Address.
 *  + FavoriteHeart to add/remove hotel from user favorites.
 *
 * Rendered by FavoritesList.
 */
const FavoriteHotelCard = ({ hotel }) => {
  const starIcons = [];
  const [hotelImage, setHotelImage] = useState("");

  for (let s = 1; s <= hotel.propertyDescription.starRating; s++) {
    starIcons.push(s);
  }

  const hotelAddress = `${hotel.propertyDescription.address.fullAddress}`;

  useEffect(() => {
    let isSubscribed = true;
    const fetchImage = async () => {
      try {
        const image = await PlacesApi.getImage(
          `${hotel.propertyDescription.name}, ${hotel.propertyDescription.address.cityName}`
        );
        if (isSubscribed) setHotelImage(image);
      } catch (e) {
        console.error(e);
      }
    };
    fetchImage();
    return () => (isSubscribed = false);
  }, [
    hotel.propertyDescription.name,
    hotel.propertyDescription.address.cityName,
  ]);

  return (
    <div className="HotelCard m-2">
      <div className="card" style={{ maxWidth: "435px" }}>
        <img
          src={hotelImage}
          alt={hotel.propertyDescription.name}
          style={{ maxHeight: "300px" }}
        />
        <h3 className="card-header">{hotel.propertyDescription.name}</h3>
        <div className="card-body">
          <FavoriteHeart hotelId={hotel.pdpHeader.hotelId} />
          <h4 className="card-title">
            Rating:{" "}
            {starIcons.map((s) => (
              <i className="fa fa-star" key={s} style={{ color: "gold" }}></i>
            ))}
          </h4>
          <p className="card-text">
            <span className="fw-bold">Neighborhood: </span>
            {hotel.propertyDescription.address.cityName}
          </p>
          <p className="card-text">
            <span className="fw-bold">Address: </span>
            {hotelAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteHotelCard;
