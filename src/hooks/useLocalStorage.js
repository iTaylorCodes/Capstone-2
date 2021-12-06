import { useState, useEffect } from "react";

// Custom hook for keeping state data synced with localStorage
function useLocalStorage(key, firstValue = null) {
  const intitialValue = localStorage.getItem(key);

  const [item, setItem] = useState(intitialValue);

  useEffect(() => {
    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;
