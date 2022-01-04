import Score from "./Score";

const Scores = ({ scores }) => {
  return (
    <div className="Scores row p-1 d-flex justify-content-center">
      {scores.bikeScore.score ? (
        <div className="col-4 col-md-5">
          <Score score={scores.bikeScore} />
        </div>
      ) : (
        ""
      )}
      {scores.walkScore.score ? (
        <div className="col-4 col-md-5">
          <Score score={scores.walkScore} />
        </div>
      ) : (
        ""
      )}
      {scores.transitScore.score ? (
        <div className="col-4 col-md-5">
          <Score score={scores.transitScore} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Scores;
