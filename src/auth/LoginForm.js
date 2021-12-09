import { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "../alert/Alert";
import useFields from "../hooks/useFields";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // Handles form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="row justify-content-center mb-3">
      <div className="col-10 col-sm-9 col-md-8 col-lg-7 mt-5">
        <h1 className="m-3">Login</h1>
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
                required
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
                required
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <div className="m-3 d-flex justify-content-end">
              <button className="btn btn-primary btn-lg" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
