import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../homepage/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import Profile from "../profile/Profile";
import Neighborhood from "../neighborhoods/Neighborhood";
import FavoritesList from "../favorites/FavoritesList";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/neighborhood/:neighborhood" element={<Neighborhood />} />
      <Route path="/favorites" element={<FavoritesList />} />
    </Routes>
  );
};

export default Router;
