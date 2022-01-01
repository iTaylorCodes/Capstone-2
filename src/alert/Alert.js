import { v4 as uuidv4 } from "uuid";

/** Alert component
 *
 * Shows bootstrap style alerts
 *
 * Used for LoginForm, SignupForm, and Profile components
 */

const Alert = ({ type = "danger", messages = [] }) => {
  return (
    <div className={`alert alert-${type} m-3`} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={uuidv4()}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default Alert;
