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
        <div className="col-lg-5 col-xl-4">
          {cityInfo.scores ? <Scores scores={cityInfo.scores} /> : ""}
          <a
            href={`https://www.zillow.com/homes/${cityInfo.city}_rb/`}
            target="_blank"
            className="btn btn-primary mb-3"
          >
            View available properties on Zillow
          </a>
        </div>

        <div className="col-lg-6 col-xl-7">
          <img
            src={cityInfo.image}
            alt={`${cityInfo.city}`}
            className="img-fluid img-thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default Neighborhood;
