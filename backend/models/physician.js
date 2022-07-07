"use strict";

const { use } = require("../app");
const db = require("../db");

class Physician {
  static async createPhysicianData({
    first_name,
    last_name,
    title,
    specialty,
    located,
    street_name,
    city,
    image_url,
    phone,
    physician_bio,
  }) {
    await db.query(
      `INSERT INTO physicians (first_name,last_name,title,specialty,located,street_name,city,image_url,phone,physician_bio)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        first_name,
        last_name,
        title,
        specialty,
        located,
        street_name,
        city,
        image_url,
        phone,
        physician_bio,
      ]
    );
  }
  static async getAllPhysicians(searchFilters = {}) {
    let query = `SELECT id,first_name,last_name,title,specialty,located,street_name,city,image_url,phone,physician_bio,rating FROM physicians`;
    let whereExpressions = [];
    let queryValues = [];

    const { first_name, city } = searchFilters;
    if (first_name) {
      queryValues.push(`%${first_name}%`);
      whereExpressions.push(`first_name ILIKE $${queryValues.length}`);
    }
    if (city) {
      queryValues.push(`%${city}%`);
      whereExpressions.push(`city ILIKE $${queryValues.length}`);
    }
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }
    query += " ORDER BY first_name";
    const physicianRes = await db.query(query, queryValues);
    return physicianRes.rows;
  }
  static async getPhysicianByName(name) {
    const physician = await db.query(
      `SELECT id,first_name,last_name,title,specialty,located,street_name,city,image_url,phone,physician_bio FROM physicians WHERE first_name=$1`,
      [name]
    );
    return physician;
  }
  static async getPhysiciansHospital(located, first_name) {
    let res = await db.query(
      `SELECT * FROM hospitals,physicians WHERE hospitals.name = $1 AND physicians.first_name = $2`,
      [located, first_name]
    );
    return res;
  }
  static async updatePhysician(image_url, first_name) {
    await db.query(
      "UPDATE physicians SET image_url = $1 WHERE physicians.first_name = $2",
      [image_url, first_name]
    );
  }
  static async updatePhysicianRating(
    userId,
    physicianId,
    reviewVal,
    newRating
  ) {
    let total = 0;
    console.log("ONE");
    console.log(total);
    console.log("ONE");
    let newRate = await db.query(
      "INSERT INTO  reviews(user_id,physician_id,review,rating) VALUES ($1,$2,$3,$4) RETURNING id,review,rating",
      [userId, physicianId, reviewVal, newRating]
    );
    console.log("TWO");
    console.log(total);
    console.log("TWO");
    let allRatings = await db.query(
      "SELECT reviews.rating FROM reviews WHERE reviews.physician_id = $1",
      [physicianId]
    );
    console.log("THREE");
    console.log(total);
    console.log("THREE");
    for (let rating of allRatings.rows) {
      total += rating.rating;
      console.log("FOUR (LOOP)");
      console.log(total);
      console.log("FOUR (LOOP)");
    }
    console.log("FIVE (OUT OF LOOP)");
    console.log(total);
    console.log("FIVE (OUT OF LOOP)");
    let r;
    if (allRatings.rows.length <= 1) {
      r = newRate.rows[0].rating;
    } else {
      r = Math.floor(total / allRatings.rows.length);
    }

    console.log("SIX (DONE)");
    console.log(
      `Total:${total}, New Rate: ${newRate.rows[0].rating}, Length: ${allRatings.rows.length}`
    );

    await db.query(
      `UPDATE physicians SET rating = $1 WHERE physicians.id = $2`,
      [r, physicianId]
    );
    console.log(total);
    console.log(r);
    return newRate.rows;
  }
  static async getRatings(id) {
    try {
      let allRatings = await db.query(
        "SELECT reviews.rating FROM reviews WHERE reviews.physician_id=$1",
        [id]
      );
      let totalRating = await db.query(
        "SELECT rating FROM physicians WHERE physicians.id=$1",
        [id]
      );
      let res = {
        allRatings: allRatings.rows.map((r) => r.rating),
        totalRating: totalRating.rows[0].rating,
      };
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = Physician;
