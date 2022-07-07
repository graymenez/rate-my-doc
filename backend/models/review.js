const db = require("../db");

class Review {
  static async createReview(user_id, id, value, createFor) {
    if (createFor === "physician") {
      await db.query(
        `INSERT INTO reviews (user_id,physician_id,review,rating) VALUES ($1,$2,$3) RETURNING review`,
        [user_id, id, value]
      );
    } else if (createFor === "hospital") {
      await db.query(
        `INSERT INTO hreviews (user_id,hospital_id,rating_id,review) VALUES ($1,$2,$3,$4) RETURNING review`,
        [user_id, id, rating_id, value]
      );
    }
  }
  static async getAllPhysicianReviews(physician_id) {
    let res = await db.query(
      `SELECT reviews.id,user_id,physician_id,review,rating,username FROM reviews,users WHERE reviews.physician_id=$1 AND user_id = users.id`,
      [physician_id]
    );
    console.log("555555555555555555555555555555");
    console.log(res);
    console.log("555555555555555555555555555555");
    return res;
  }
  static async getAllHospitalReviews(hospital_id) {
    let res = await db.query(
      `SELECT hreviews.id,user_id,hospital_id,review,rating,username FROM hreviews,users WHERE hreviews.hospital_id=$1 AND user_id = users.id`,
      [hospital_id]
    );
    return res;
  }
  // static async getReviewsAndRatingsP(user_id) {
  //   let res = await db.query(
  //     `SELECT username,rating,review FROM users,ratings,reviews WHERE ratings.physician_id = reviews.physician_id AND users.id = $1`,
  //     [user_id]
  //   );
  //   return res;
  // }
  // static async getReviewsAndRatingsH(rating_id) {
  //   let res = await db.query(
  //     `SELECT username,rating,review FROM hratings,hreviews,users WHERE hratings.id = hreviews.rating_id AND hreviews.rating_id = $1`,
  //     [rating_id]
  //   );
  //   return res;
  // }
}
module.exports = Review;
