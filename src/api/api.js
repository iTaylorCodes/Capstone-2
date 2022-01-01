import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_PLACES_URL = process.env.REACT_APP_PLACES_URL;
const BASE_PHOTO_URL = process.env.REACT_APP_PHOTO_URL;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

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
  static async getImage(city_state) {
    const placesUrl = `${BASE_PLACES_URL}/json?input=${city_state}&key=${process.env.REACT_APP_PLACES_API_KEY}&inputtype=textquery&fields=name,photos`;

    const initialPlacesRequest = await axios
      .get(PROXY_URL + placesUrl)
      .catch(console.error);

    const photoRef =
      initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;

    if (!photoRef) throw Error("City not found.");

    const imageLookupUrl = `${BASE_PHOTO_URL}?photoreference=${photoRef}&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=700&maxheight=700`;

    const imageUrlQuery = await fetch(PROXY_URL + imageLookupUrl)
      .then((r) => r.blob())
      .catch(console.error);

    const image = URL.createObjectURL(imageUrlQuery);

    return image;
  }
}

export { NeighborhoodApi, PlacesApi };
