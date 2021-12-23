const INITIAL_STATE = {
  accountWasDeleted: false,
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

    default:
      return state;
  }
};

export default rootReducer;
