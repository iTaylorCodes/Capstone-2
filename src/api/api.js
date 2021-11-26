import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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

export { NeighborhoodApi };
