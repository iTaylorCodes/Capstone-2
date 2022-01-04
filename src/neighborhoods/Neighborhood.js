import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const cityInfo = useSelector((st) => {
    for (let val of st.recentSearches) {
      if (val.city === neighborhood) return val;
    }
  });

  if (!cityInfo) navigate("/", { replace: true });

  return (
    <div className="Neighborhood text-center m-3">
      <h1>{cityInfo.city}</h1>
      <div className="row d-flex justify-content-center">
        {cityInfo.scores ? (
          <div className="col-md-6 col-lg-5 col-xl-4">
            <Scores scores={cityInfo.scores} />
          </div>
        ) : (
          ""
        )}
        <div className="col-md-6 col-lg-5 col-xl-4">
          <img
            src={cityInfo.image}
            alt={`${cityInfo.city} image`}
            className="img-fluid img-thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default Neighborhood;
