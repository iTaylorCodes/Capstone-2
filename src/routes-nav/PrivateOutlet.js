import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for private routing.
 *
 * In Router component, this is the element rendered for private routes.
 *
 * This component will check if there is a valid current user
 * and only continues to the route if so.
 *
 * If no user is present, redirects homepage.
 */
function PrivateOutlet() {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <Outlet /> : <Navigate replace to="/" />;
}

export default PrivateOutlet;
