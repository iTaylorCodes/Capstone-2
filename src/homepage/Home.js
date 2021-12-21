import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../alert/Alert";

const Home = () => {
  const dispatch = useDispatch();
  const accountWasDeleted = useSelector((st) => st.accountWasDeleted);

  // Handles showing a timed alert if redirected here after deleting user account
  useEffect(() => {
    if (accountWasDeleted) {
      setTimeout(() => {
        dispatch({
          type: "RESET_ACCOUNT_DELETED",
        });
      }, 5000);
    }
  }, [dispatch, accountWasDeleted]);

  return (
    <div className="container">
      <div className="fw-bold">
        {accountWasDeleted ? (
          <Alert type="warning" messages={["Your account has been deleted."]} />
        ) : null}
      </div>

      <div>Temporary Neighborhood Homepage</div>
    </div>
  );
};

export default Home;
