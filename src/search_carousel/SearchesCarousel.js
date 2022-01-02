import { Link } from "react-router-dom";

/** SearchesCarousel.
 *
 * Carousel component to show recent searches from Redux reducer.
 *    SearchesCarousel images link to /neighborhood/:neighborhood route.
 *
 * Rendered on homepage.
 */
const SearchesCarousel = ({ recentSearches }) => {
  let searches = recentSearches.map((s) => {
    if (recentSearches.indexOf(s) === 0) {
      return (
        <div className="carousel-item active" key={s.id}>
          <Link to={`/neighborhood/${s.city}`}>
            <img
              src={s.image}
              className="d-block w-100"
              alt={s.city}
              style={{ width: "300px", height: "300px" }}
            />
            <div className="carousel-caption d-block" style={{ top: "8px" }}>
              <h5
                className="bg-primary bg-gradient rounded d-inline p-2"
                style={{ textShadow: "2px 2px black" }}
              >
                {s.city}
              </h5>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="carousel-item" key={s.id}>
          <Link to={`/neighborhood/${s.city}`}>
            <img
              src={s.image}
              className="d-block w-100"
              alt={s.city}
              style={{ width: "300px", height: "300px" }}
            />
            <div className="carousel-caption d-block" style={{ top: "8px" }}>
              <h5
                className="bg-primary bg-gradient rounded d-inline p-2"
                style={{ textShadow: "2px 2px black" }}
              >
                {s.city}
              </h5>
            </div>
          </Link>
        </div>
      );
    }
  });

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">{searches}</div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default SearchesCarousel;
