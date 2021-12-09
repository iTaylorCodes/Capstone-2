import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import UserContext from "../auth/UserContext";

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="NavBar navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink
          className={() => "navbar-brand text-primary fs-4 fw-bold"}
          to="/"
        >
          Neighborhood
        </NavLink>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          {!currentUser ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link activeLink" : "nav-link"
                  }
                  to="/signup"
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link activeLink" : "nav-link"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link activeLink" : "nav-link"
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link activeLink" : "nav-link"
                  }
                  to="/favorites"
                >
                  Favorites
                </NavLink>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={logout} className="nav-link">
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
