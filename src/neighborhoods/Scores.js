import Score from "./Score";

const Scores = ({ scores }) => {
  return (
    <div className="Scores row p-1 d-flex justify-content-center">
      {scores.bikeScore && scores.bikeScore.score ? (
        <div className="col-4 col-md-3 col-lg-5">
          <Score score={scores.bikeScore} />
        </div>
      ) : (
        ""
      )}
      {scores.walkScore && scores.walkScore.score ? (
        <div className="col-4 col-md-3 col-lg-5">
          <Score score={scores.walkScore} />
        </div>
      ) : (
        ""
      )}
      {scores.transitScore && scores.transitScore.score ? (
        <div className="col-4 col-md-3 col-lg-5">
          <Score score={scores.transitScore} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Scores;
