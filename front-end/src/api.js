import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const loggedInUserToken = localStorage.getItem("_token");

class RmdApi {
  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);
    const url =
      BASE_URL === process.env.REACT_APP_BASE_URL
        ? `${BASE_URL}${endpoint}`
        : `${BASE_URL}/${endpoint}`;
    const params = method === "get" ? data : {};
    const headers = { authorization: loggedInUserToken };
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //************************************************************************************** */
  //******************************** User Api Routes ************************************* */
  //************************************************************************************** */

  static async registerUser(username, password, email) {
    let res = await this.request(
      "auth/register",
      { username: username, password: password, email: email },
      "POST"
    );
    return res;
  }

  static async authenticateUser(username, password) {
    let res = await this.request("auth/login", { username, password }, "POST");
    return res;
  }

  //************************************************************************************** */
  //***************************** Hospitals Api Routes *********************************** */
  //************************************************************************************** */

  static async getAllHospitals(searchFilters = null) {
    if (!searchFilters) {
      let res = await this.request(`hospitals/`);
      return res.hospitals;
    } else {
      let res = await this.request(`hospitals?${searchFilters}`);
      return res.hospitals;
    }
  }
  static async getHospitalByName(name) {
    let res = await this.request(`hospitals/${name}`);
    return res.hospital.rows[0];
  }
  static async getHospitalRatingById(id) {
    let res = await this.request(`hospitals/ratings/${id}`);
    return res.hospitalRatings;
  }
  static async getHospitalReviews(id) {
    let res = await this.request(`reviews/hospital/${id}`);
    return res.results.rows;
  }
  static async updateHospitalRatings(
    user_id,
    hospital_id,
    reviewVal,
    newRating
  ) {
    let body = {
      user_id: user_id,
      hospital_id: hospital_id,
      reviewVal: reviewVal,
      newRating: newRating,
    };
    let res = await this.request("hospitals/ratings", body, "post");
    return res.hospitalRatings[0];
  }
  //************************************************************************************** */
  //***************************** Physicians Api Routes ********************************** */
  //************************************************************************************** */

  static async getAllPhysicians(searchFilters = null) {
    if (!searchFilters) {
      let res = await this.request(`physicians/`);
      return res;
    } else {
      let res = await this.request(`physicians?${searchFilters}`);
      return res.physicians;
    }
  }
  static async getPhysicianByName(name) {
    let res = await this.request(`physicians/${name}`);
    return res.physician.rows[0];
  }
  static async getPhysicianRatingById(id) {
    let res = await this.request(`physicians/ratings/${id}`);
    return res.physicianRatings;
  }

  static async getPhysicianReviews(physician_id) {
    let res = await this.request(`reviews/physician/${physician_id}`);
    return res.results.rows;
  }

  static async updatePhysicianRatings(
    user_id,
    physician_id,
    reviewVal,
    newRating
  ) {
    let body = {
      user_id: user_id,
      physician_id: physician_id,
      reviewVal,
      newRating,
    };
    let res = await this.request("physicians/ratings", body, "post");
    return res.physicianRatings[0];
  }

  //************************************************************************************** */
  //************************************ User Routes ************************************* */
  //************************************************************************************** */

  static async getUserById(user_id) {
    const res = await this.request(`users/${user_id}`);
    return res;
  }
  static async updateUser(id, first_name, last_name, image_url, password) {
    let data = {
      first_name: first_name,
      last_name: last_name,
      image_url: image_url,
      password: password,
    };
    await this.request(`users/update/${id}`, data, "patch");
  }
  static async uploadPhoto(id, base64EncodedImage) {
    await this.request(
      `users/api/upload/${id}`,
      { base64EncodedImage },
      "post"
    );
  }
  static async getGallery(user_id) {
    let results = await this.request(`gal/gallery/${user_id}`);
    return results;
  }
  static async updateProfilePicture(user_id, image_url) {
    let data = {
      image_url: image_url,
    };
    await this.request(`gal/gallery/${user_id}`, data, "patch");
  }
}

RmdApi.token = loggedInUserToken;
export default RmdApi;
