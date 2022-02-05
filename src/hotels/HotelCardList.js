import HotelCard from "./HotelCard";

/** Hotel Card List.
 *
 * Component dedicated to showing a list of HotelCard components.
 *
 * Renders multiple HotelCard components, passing in data from HotelsApi.
 *
 * Rendered by Neighborhood.
 */
const HotelCardList = ({ hotels }) => {
  return (
    <div className="row g-0 d-flex justify-content-center">
      {hotels.map((h) => {
        return (
          <div className="col-10 col-sm-6" key={h.id}>
            <HotelCard hotel={h} />
          </div>
        );
      })}
    </div>
  );
};

export default HotelCardList;
