import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlacesApi, WalkScoreApi } from "../api/api";

/** SearchBar.
 *
 * Search form component to search for neighborhoods.
 * On search, redirects to /neighborhood/:neighborhood route.
 *    Also dispatches recent searches into Redux reducer.
 *
 * Rendered on homepage.
 */
const SearchBar = ({ setSearchError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchFor = async (searchTerm) => {
    let image;
    let scores;
    try {
      image = await PlacesApi.getImage(searchTerm);
      scores = await WalkScoreApi.getScores(searchTerm);
    } catch (e) {
      console.error(e);
      setSearchError(e.message);
      return;
    }

    dispatch({
      type: "NEW_SEARCH",
      searchTerm,
      image,
      scores,
    });

    navigate(`/neighborhood/${searchTerm}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm) return;

    searchFor(searchTerm.trim());
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchError(null);
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            className="form-control ps-5 pe-5"
            name="searchTerm"
            id="city-search"
            placeholder="Search City, State:"
            value={searchTerm}
            onChange={handleChange}
          />
          <label htmlFor="city-search">Search City, State:</label>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          data-testid="search-button"
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
