/** Score.
 *
 * Component dedicated to showing a neighborhood score.
 *
 * Renders a score provided by the walkscore api.
 *
 * Rendered by Scores.
 */
const Score = ({ score }) => {
  return (
    <div
      className="Score m-3 rounded-circle p-2"
      style={{ width: "125px", height: "125px", background: "#5DD95D" }}
    >
      <h2>{score.score}</h2>
      <p>{score.description}</p>
    </div>
  );
};

export default Score;
