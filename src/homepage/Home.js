import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../logos/Neighborhoodz-Logo.png";
import Alert from "../alert/Alert";
import SearchBar from "../search_bar/SearchBar";
import SearchesCarousel from "../search_carousel/SearchesCarousel";
import "./Home.css";

/** Homepage.
 *
 * Renders the SearchBar component to search for neighborhoods.
 * On search, authenticates user and redirects to /neighborhood/:neighborhood route.
 *    Also dispatches recent searches into Redux reducer.
 *
 * Also renders the SearchCarousel component to show recent searches from Redux reducer.
 *    SearchesCarousel images link to /neighborhood/:neighborhood route.
 *
 * Routed at /
 */
const Home = () => {
  const dispatch = useDispatch();
  const [searchError, setSearchError] = useState(null);
  const accountWasDeleted = useSelector((st) => st.accountWasDeleted);
  const recentSearches = useSelector((st) => st.recentSearches);

  useEffect(() => {
    // Handles removing timed alert if redirected here after deleting user account
    if (accountWasDeleted) {
      setTimeout(() => {
        dispatch({
          type: "RESET_ACCOUNT_DELETED",
        });
      }, 5000);
    }
  }, [dispatch, accountWasDeleted, recentSearches]);

  const clearSearches = () => {
    dispatch({ type: "DELETE_SEARCHES" });
  };

  return (
    <div className="text-center home-hero">
      <div className="HomeContent mt-3">
        <div className="Home-heading mb-3">
          <h1 className="text-primary mb-3">
            <img src={logo} alt="Logo" className="me-2 Home-logo" />
            Neighborhoodz
          </h1>
          <h3>Find your new Neighborhood!</h3>
        </div>

        <div id="alert-container" className="fw-bold">
          {accountWasDeleted ? (
            <Alert
              type="warning"
              messages={["Your account has been deleted."]}
            />
          ) : null}
          {searchError ? (
            <div className="alert alert-danger m-3" role="alert">
              <p className="mb-0 small">{searchError}</p>
            </div>
          ) : null}
        </div>

        <div className="SearchBar d-flex justify-content-center">
          <SearchBar setSearchError={setSearchError} />
        </div>

        <div className="SearchesCarousel container d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4 bg-light rounded text-center p-1">
            <div className="row mb-1">
              <div className="col-11 d-flex justify-content-center">
                <h3>Recent Searches</h3>
              </div>
              {recentSearches.length ? (
                <div className="col-1 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearSearches}
                  >
                    Clear
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {recentSearches.length ? (
              <SearchesCarousel recentSearches={recentSearches} />
            ) : (
              <p>Your most recent searches will be shown here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
