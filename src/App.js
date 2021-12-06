import NavBar from "./routes-nav/NavBar";
import Router from "./routes-nav/Router";
import { NeighborhoodApi } from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";

// Key name for storing token in localStorage
export const LOCAL_STORAGE_TOKEN = "neighborhood-token";

function App() {
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN);

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

  return (
    <div className="App">
      <NavBar />
      <div>
        <Router signup={signup} />
      </div>
    </div>
  );
}

export default App;
