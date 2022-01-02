import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import Profile from "../profile/Profile";
import Neighborhood from "../neighborhoods/Neighborhood";
import FavoritesList from "../favorites/FavoritesList";
import PrivateOutlet from "./PrivateOutlet";

/** Router.
 *
 * Handles application routing.
 */
const Router = ({ signup, login, logout }) => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm signup={signup} />} />
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/profile" element={<PrivateOutlet />}>
        <Route path="/profile" element={<Profile logout={logout} />} />
      </Route>
      <Route path="/neighborhood/:neighborhood" element={<Neighborhood />} />
      <Route path="/favorites" element={<PrivateOutlet />}>
        <Route path="/favorites" element={<FavoritesList />} />
      </Route>
    </Routes>
  );
};

export default Router;
