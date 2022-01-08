import rootReducer from "./rootReducer";

const initialState = {
  accountWasDeleted: false,
  recentSearches: [],
};

describe("Reducer Tests", () => {
  it("returns the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it("handles account deleted status", () => {
    expect(rootReducer(initialState, { type: "ACCOUNT_DELETED" })).toEqual({
      ...initialState,
      accountWasDeleted: true,
    });
  });

  it("handles reset account deleted status", () => {
    expect(
      rootReducer(initialState, { type: "RESET_ACCOUNT_DELETED" })
    ).toEqual(initialState);
  });

  it("handles collecting recent searches", () => {
    expect(
      rootReducer(initialState, {
        type: "NEW_SEARCH",
        searchTerm: "LA",
        image: "imageUrl",
        scores: {},
      })
    ).toEqual({
      ...initialState,
      recentSearches: [
        { city: "LA", image: "imageUrl", id: expect.any(String), scores: {} },
      ],
    });
  });

  it("only collects 5 recent searches", () => {
    let state = {
      accountWasDeleted: false,
      recentSearches: [
        {
          city: "San Diego",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Los Angeles",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Las Vegas",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "New York",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Chicago",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
      ],
    };

    expect(
      rootReducer(state, {
        type: "NEW_SEARCH",
        searchTerm: "Portland",
        image: "imageUrl",
        scores: {},
      })
    ).toEqual({
      ...state,
      recentSearches: [
        {
          city: "Los Angeles",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Las Vegas",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "New York",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Chicago",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Portland",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
      ],
    });
  });

  it("doesn't collect duplicate searches", () => {
    let state = {
      accountWasDeleted: false,
      recentSearches: [
        {
          city: "Los Angeles",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Las Vegas",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
      ],
    };

    expect(
      rootReducer(state, {
        type: "NEW_SEARCH",
        searchTerm: "Los Angeles",
        image: "imageUrl",
        scores: {},
      })
    ).toEqual({
      ...state,
      recentSearches: [
        {
          city: "Los Angeles",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
        {
          city: "Las Vegas",
          image: "imageUrl",
          id: expect.any(String),
          scores: {},
        },
      ],
    });
  });
});
