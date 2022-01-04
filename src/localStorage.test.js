import { loadState } from "./localStorage";
import { saveState } from "./localStorage";

describe("loadState", () => {
  test("returns undefined if key not in localStorage", () => {
    expect(loadState("test")).toBe(undefined);
  });
});

describe("saveState", () => {
  test("saves state in localStorage", () => {
    saveState(["test state"], "test");
    expect(loadState("test")).toEqual(["test state"]);
  });
});

describe("error handling", () => {
  test("loadState can handle an error if can't access localStorage", () => {
    const localStorageGetItemMock = jest.spyOn(
      window.localStorage.__proto__,
      "getItem"
    );
    localStorageGetItemMock.mockImplementation(() => {
      throw new Error("Failed to access localStorage.");
    });

    expect(loadState("test2")).toEqual(undefined);
  });

  test("saveState can handle an error if can't access localStorage", () => {
    const localStorageSetItemMock = jest.spyOn(
      window.localStorage.__proto__,
      "setItem"
    );
    localStorageSetItemMock.mockImplementation(() => {
      throw new Error("Failed to access localStorage.");
    });

    saveState(["test state"], "test");
  });
});
