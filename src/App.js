import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { NeighborhoodApi } from "./api/api";
import NavBar from "./routes-nav/NavBar";
import Router from "./routes-nav/Router";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";

// Key name for storing token in localStorage
export const LOCAL_STORAGE_TOKEN = "neighborhood-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN);

  // Gets the current user if token in localStorage
  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          NeighborhoodApi.token = token;
          let currentUser = await NeighborhoodApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (e) {
          console.error("Error Losing user info", e);
          setCurrentUser(null);
        }
      }
    };
    getCurrentUser();
  }, [token]);

  // Handles signing up
  const signup = async (signupData) => {
    try {
      let token = await NeighborhoodApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup attempt failed", errors);
      return { success: false, errors };
    }
  };

  // Handles logging out
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  // Handles login
  const login = async (loginData) => {
    try {
      let token = await NeighborhoodApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login attempt failed", errors);
      return { success: false, errors };
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <NavBar logout={logout} />
        <div>
          <Router signup={signup} login={login} />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
