import { NeighborhoodApi, PlacesApi, WalkScoreApi, HotelsApi } from "./api";

describe("NeighborhoodApi", function () {
  test("signup", async function () {
    const resp = await NeighborhoodApi.signup({
      username: "testinguser",
      firstName: "Tester",
      lastName: "Test",
      password: "testpassword",
      email: "testingemail@test.com",
    });
    expect(resp).toEqual(expect.any(String));
    if (!NeighborhoodApi.token) NeighborhoodApi.token = resp;
  });

  test("login", async function () {
    const resp = await NeighborhoodApi.login({
      username: "testinguser",
      password: "testpassword",
    });
    expect(resp).toEqual(expect.any(String));
    if (!NeighborhoodApi.token) NeighborhoodApi.token = resp;
  });

  test("updateProfile", async function () {
    const resp = await NeighborhoodApi.updateProfile("testinguser", {
      firstName: "UpdatedName",
    });
    expect(resp).toEqual({
      username: "testinguser",
      firstName: "UpdatedName",
      lastName: "Test",
      email: "testingemail@test.com",
    });
  });

  test("getCurrentUser", async function () {
    const resp = await NeighborhoodApi.getCurrentUser("testinguser");
    expect(resp).toEqual({
      id: expect.any(Number),
      username: "testinguser",
      firstName: "UpdatedName",
      lastName: "Test",
      email: "testingemail@test.com",
      favoritedProperties: [],
    });
  });

  test("favoriteProperty", async function () {
    await NeighborhoodApi.favoriteProperty("testinguser", 123);
    const resp = await NeighborhoodApi.getCurrentUser("testinguser");
    expect(resp).toEqual({
      id: expect.any(Number),
      username: "testinguser",
      firstName: "UpdatedName",
      lastName: "Test",
      email: "testingemail@test.com",
      favoritedProperties: [123],
    });
  });

  test("unFavoriteProperty", async function () {
    await NeighborhoodApi.unFavoriteProperty("testinguser", 123);
    const resp = await NeighborhoodApi.getCurrentUser("testinguser");
    expect(resp).toEqual({
      id: expect.any(Number),
      username: "testinguser",
      firstName: "UpdatedName",
      lastName: "Test",
      email: "testingemail@test.com",
      favoritedProperties: [],
    });
  });

  test("deleteProfile", async function () {
    await NeighborhoodApi.deleteProfile("testinguser");
  });
});

describe("PlacesApi", () => {
  global.URL.createObjectURL = jest.fn();

  afterEach(() => {
    global.URL.createObjectURL.mockReset();
  });

  test("getImage calls URL.createObjectURL mock", async function () {
    await PlacesApi.getImage("Los Angeles, CA");
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
});

describe("WalkScoreApi", () => {
  test("getScores returns city scores", async function () {
    const res = await WalkScoreApi.getScores("Los Angeles, CA");
    expect(res).toEqual(expect.any(Object));
  });
});

describe("HotelsApi", () => {
  jest.setTimeout(30000);

  test("getCityId returns cityId", async function () {
    const res = await HotelsApi.getCityId("Los Angeles, CA");
    expect(res).toEqual(expect.any(String));
  });

  test("getHotels returns list of hotels", async function () {
    const res = await HotelsApi.getHotels("Los Angeles, CA");
    expect(res).toEqual(expect.any(Array));
  });

  test("getHotel returns details of hotel", async function () {
    const res = await HotelsApi.getHotel("634418464");
    expect(res).toEqual(expect.any(Object));
  });
});
