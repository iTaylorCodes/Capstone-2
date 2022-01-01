import { useState } from "react";
import { useDispatch } from "react-redux";
import { PlacesApi } from "../api/api";

const SearchBar = ({ setSearchError }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const searchFor = async (searchTerm) => {
    let image;
    try {
      image = await PlacesApi.getImage(searchTerm);
    } catch (e) {
      console.error(e);
      setSearchError(e.message);
      return;
    }

    dispatch({
      type: "NEW_SEARCH",
      searchTerm,
      image,
    });
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
