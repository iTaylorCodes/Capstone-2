import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { HotelsApi } from "../api/api";
import HotelCardList from "../hotels/HotelCardList";
import Scores from "./Scores";

/** Neighborhood.
 *
 * Component dedicated to the neighborhood being searched for.
 *
 * Renders scores provided by the walkscore api.
 *
 * Routed at /neighborhood/:neighborhood
 */
const Neighborhood = () => {
  const { neighborhood } = useParams();
  const [showingHotels, setShowingHotels] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cityInfo = useSelector((st) => {
    for (let val of st.recentSearches) {
      if (val.city === neighborhood) return val;
    }
  });

  const fetchHotels = async () => {
    try {
      return await HotelsApi.getHotels(cityInfo.city);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = async (e) => {
    setIsLoading(true);

    if (!hotels.length) setHotels(await fetchHotels());

    setIsLoading(false);
    setShowingHotels(!showingHotels);
  };

  if (!cityInfo) navigate("/", { replace: true });

  return (
    <div className="Neighborhood text-center m-3">
      <h1>{cityInfo.city}</h1>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5 col-xl-4">
          {cityInfo.scores ? <Scores scores={cityInfo.scores} /> : ""}
          <div className="row p-1 m-2 d-flex justify-content-center">
            <div>
              <a
                href={`https://www.zillow.com/homes/${cityInfo.city}_rb/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mb-3"
              >
                View available properties on Zillow
              </a>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={handleClick}
                data-testid="hotelBtn"
              >
                {showingHotels ? "Hide Nearby Hotels" : "Show Nearby Hotels"}
              </button>
            </div>
          </div>
        </div>

        {!showingHotels & isLoading ? (
          <div className="col-lg-6 col-xl-7">
            <h2>Loading Hotels...</h2>
          </div>
        ) : (
          ""
        )}

        {!showingHotels & !isLoading ? (
          <div className="col-lg-6 col-xl-7">
            <img
              src={cityInfo.image}
              alt={`${cityInfo.city}`}
              className="img-fluid img-thumbnail"
            />
          </div>
        ) : (
          <div className="col-lg-6 col-xl-7">
            <HotelCardList hotels={hotels} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Neighborhood;
