import { useEffect, useState } from "react";
import { PlacesApi } from "../api/api";

/** Hotel Card.
 *
 * Component to show a card with hotel details provided by HotelsAPI.
 *
 * Renders -> Hotel ID, Name, Image, Star Rating, Neighborhood, and Address.
 *
 * Rendered by HotelCardList.
 */
const HotelCard = ({ hotel }) => {
  const starIcons = [];
  const [hotelImage, setHotelImage] = useState("");

  for (let s = 1; s <= hotel.starRating; s++) {
    starIcons.push(s);
  }

  const hotelAddress = `${hotel.address.streetAddress}, ${hotel.address.locality}, ${hotel.address.region} ${hotel.address.postalCode}`;

  useEffect(() => {
    let isSubscribed = true;
    const fetchImage = async () => {
      try {
        const image = await PlacesApi.getImage(
          `${hotel.name}, ${hotel.address.locality}`
        );
        if (isSubscribed) setHotelImage(image);
      } catch (e) {
        console.error(e);
      }
    };
    fetchImage();
    return () => (isSubscribed = false);
  }, [hotel.name, hotel.address.locality]);

  return (
    <div className="HotelCard m-2">
      <div className="card" style={{ maxWidth: "435px" }}>
        <img src={hotelImage} alt={hotel.name} style={{ maxHeight: "300px" }} />
        <h3 className="card-header">{hotel.name}</h3>
        <div className="card-body">
          <h4 className="card-title">
            Rating:{" "}
            {starIcons.map((s) => (
              <i className="fa fa-star" key={s} style={{ color: "gold" }}></i>
            ))}
          </h4>
          <p className="card-text">
            <span className="fw-bold">Neighborhood: </span>
            {hotel.neighbourhood}
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

export default HotelCard;
