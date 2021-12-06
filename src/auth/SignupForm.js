import { useState } from "react";
import useFields from "../hooks/useFields";
import { useNavigate } from "react-router";
import Alert from "../alert/Alert";

/** Signup Form.
 *
 * Shows a form to signup and manages update to state on changes.
 * On submission, add new user to database and redirects to / route.
 *
 * Routed at /signup
 */
const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, handleChange] = useFields({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8 col-md-7 col-lg-6">
        <h1 className="m-3">Create an Account</h1>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
            <div className="m-3">
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
                placeholder="First Name"
                autoComplete="firstName"
              />
            </div>
            <div className="m-3">
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
                placeholder="Last Name"
                autoComplete="lastName"
              />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                autoComplete="email"
              />
            </div>
            <div className="m-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <div className="m-3 d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
