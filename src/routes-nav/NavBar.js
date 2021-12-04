import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  // Handles setting currentUser until userContext is setup
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <nav className="NavBar">
      <div className="NavBar-left">
        <NavLink
          className={(navData) => (navData.isActive ? "activeLink" : "")}
          to="/"
        >
          Neighborhood
        </NavLink>
      </div>
      {!currentUser ? (
        <div className="NavBar-right">
          <NavLink
            className={(navData) => (navData.isActive ? "activeLink" : "")}
            to="/signup"
          >
            Signup
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "activeLink" : "")}
            to="/login"
            onClick={() => setCurrentUser(true)}
          >
            Login
          </NavLink>
        </div>
      ) : (
        <div className="NavBar-right">
          <NavLink
            className={(navData) => (navData.isActive ? "activeLink" : "")}
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "activeLink" : "")}
            to="/favorites"
          >
            Favorites
          </NavLink>
          <Link to="/" onClick={() => setCurrentUser(false)}>
            Logout {currentUser.username}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
