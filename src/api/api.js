import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_PLACES_URL = process.env.REACT_APP_PLACES_URL;
const BASE_PHOTO_URL = process.env.REACT_APP_PHOTO_URL;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;
const BASE_GEOCODE_URL = process.env.REACT_APP_GEOCODE_URL;
const BASE_WALKSCORE_URL = process.env.REACT_APP_WALKSCORE_URL;
const BASE_HOTELS_URL = process.env.REACT_APP_BASE_HOTELS_URL;

/** API Class.
 *
 * Static class tying together methods used to
 *    get/send to the backend database API.
 */

class NeighborhoodApi {
  // The token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NeighborhoodApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user by username */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Update user profile */
  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Delete user profile */
  static async deleteProfile(username) {
    await this.request(`users/${username}`, {}, "delete");
  }

  /** Add property to user favorites */
  static async favoriteProperty(username, propertyZpid) {
    await this.request(`users/${username}/${propertyZpid}`, {}, "post");
  }

  /** Remove property from user favorites */
  static async unFavoriteProperty(username, propertyZpid) {
    await this.request(`users/${username}/${propertyZpid}`, {}, "delete");
  }
}

/** API Class.
 *
 * Static class to get city images from Google places API.
 */

class PlacesApi {
  static async getImage(cityState) {
    const placesUrl = `${BASE_PLACES_URL}/json?input=${cityState}&key=${process.env.REACT_APP_PLACES_API_KEY}&inputtype=textquery&fields=name,photos`;

    const initialPlacesRequest = await axios
      .get(PROXY_URL + placesUrl)
      .catch(console.error);

    const photoRef =
      initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;

    if (!photoRef) throw Error("Image not found.");

    const imageLookupUrl = `${BASE_PHOTO_URL}?photoreference=${photoRef}&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=700&maxheight=700`;

    const imageUrlQuery = await fetch(PROXY_URL + imageLookupUrl)
      .then((r) => r.blob())
      .catch(console.error);

    const image = URL.createObjectURL(imageUrlQuery);

    return image;
  }
}

/** API Class.
 *
 * Static class get walk scores from Walk Score API.
 */

class WalkScoreApi {
  static async getScores(city) {
    const geocodeUrl = `${BASE_GEOCODE_URL}?key=${process.env.REACT_APP_GEOCODE_API_KEY}&location=${city}`;

    const geocodeRequest = await axios.get(geocodeUrl);

    const lat = geocodeRequest.data.results[0].locations[0].latLng.lat;
    const long = geocodeRequest.data.results[0].locations[0].latLng.lng;

    if (!lat) throw Error("City not found.");
    if (!long) throw Error("City not found.");

    const requestUrl = `${BASE_WALKSCORE_URL}/score?format=json&address=${city}&lat=${lat}&lon=${long}&transit=1&bike=1&wsapikey=${process.env.REACT_APP_WALKSCORE_API_KEY}`;

    const scoreRequest = (await axios.get(PROXY_URL + requestUrl)).data;

    const walkScore = scoreRequest.walkscore
      ? {
          score: scoreRequest.walkscore,
          description: scoreRequest.description,
        }
      : null;

    const transitScore = scoreRequest.transit
      ? {
          score: scoreRequest.transit.score,
          description: scoreRequest.transit.description,
        }
      : null;

    const bikeScore = scoreRequest.bike
      ? {
          score: scoreRequest.bike.score,
          description: scoreRequest.bike.description,
        }
      : null;

    const scores = {
      walkScore: walkScore,
      transitScore: transitScore,
      bikeScore: bikeScore,
    };

    return scores;
  }
}

/** API Class.
 *
 * Static class to get hotel data from Api Dojo Hotels API.
 */

class HotelsApi {
  static headers = {
    "x-rapidapi-host": "hotels4.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
  };

  /** Get cityId for hotel search */
  static async getCityId(city) {
    const requestUrl = `${BASE_HOTELS_URL}/locations/v2/search?query=${city}`;

    const cityRequest = await axios
      .get(PROXY_URL + requestUrl, { headers: HotelsApi.headers })
      .catch(console.error);

    const cityId =
      cityRequest?.data?.suggestions?.[0]?.entities?.[0]?.destinationId;

    if (!cityId) throw Error("City not found.");

    return cityId;
  }

  /** Get list of hotels */
  static async getHotels(city) {
    const cityId = await HotelsApi.getCityId(city);

    const requestUrl = `${BASE_HOTELS_URL}/properties/list?destinationId=${cityId}&pageNumber=1&pageSize=10&checkIn=2021-01-01&checkOut=2021-01-10&adults1=1`;

    const hotelsRequest = await axios
      .get(PROXY_URL + requestUrl, { headers: HotelsApi.headers })
      .catch(console.error);

    const hotels = hotelsRequest?.data?.data?.body?.searchResults?.results;

    return hotels;
  }

  /** Get hotel details */
  static async getHotel(hotelId) {
    const requestUrl = `${BASE_HOTELS_URL}/properties/get-details?id=${hotelId}`;

    const hotelRequest = await axios
      .get(PROXY_URL + requestUrl, { headers: HotelsApi.headers })
      .catch(console.error);

    const hotel = hotelRequest?.data?.data?.body;

    return hotel;
  }
}

export { NeighborhoodApi, PlacesApi, WalkScoreApi, HotelsApi };
