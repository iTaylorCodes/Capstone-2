import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  accountWasDeleted: false,
  recentSearches: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ACCOUNT_DELETED":
      return {
        ...state,
        accountWasDeleted: true,
      };

    case "RESET_ACCOUNT_DELETED":
      return {
        ...state,
        accountWasDeleted: false,
      };

    case "NEW_SEARCH":
      for (let s of state.recentSearches) {
        if (s.city === action.searchTerm) return { ...state };
      }

      if (state.recentSearches.length >= 5) {
        state.recentSearches.shift();
      }

      return {
        ...state,
        recentSearches: [
          ...state.recentSearches,
          {
            city: action.searchTerm,
            image: action.image,
            scores: action.scores,
            id: uuidv4(),
          },
        ],
      };

    default:
      return state;
  }
};

export default rootReducer;
