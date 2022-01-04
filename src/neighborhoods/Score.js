const Score = ({ score }) => {
  return (
    <div
      className="Score bg-info m-3 rounded-circle p-2"
      style={{ width: "125px", height: "125px" }}
    >
      <h2>{score.score}</h2>
      <p>{score.description}</p>
    </div>
  );
};

export default Score;
