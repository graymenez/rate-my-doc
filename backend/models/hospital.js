"use strict";

const db = require("../db");

class Hospital {
  static async createHospitalData({
    name,
    city,
    service_type,
    location_type,
    address,
    phone,
    fax,
    hospital_website,
  }) {
    await db.query(
      "INSERT INTO hospitals (name,city,service_type,location_type,address,phone,fax,hospital_website) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        name,
        city,
        service_type,
        location_type,
        address,
        phone,
        fax,
        hospital_website,
      ]
    );
  }

  static async getHospitalByName(name) {
    const hospital = await db.query(
      `SELECT id,name,city,service_type,location_type,address,phone,fax,hospital_website,rating FROM hospitals WHERE name=$1`,
      [name]
    );
    return hospital;
  }
  static async getAllHospitals(searchFilters = {}) {
    let query = `SELECT name,city,service_type,location_type,address,phone,fax,hospital_website,rating FROM hospitals`;
    let whereExpressions = [];
    let queryValues = [];

    const { name, city } = searchFilters;
    if (name) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }
    if (city) {
      queryValues.push(`%${city}%`);
      whereExpressions.push(`city ILIKE $${queryValues.length}`);
    }
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }
    query += " ORDER BY name";
    const hospitalRes = await db.query(query, queryValues);
    return hospitalRes.rows;
  }

  static async updateHospitalRating(userId, hospitalId, reviewVal, newRating) {
    let total = 0;
    console.log("ONE");
    console.log(total);
    console.log("ONE");
    let newRate = await db.query(
      "INSERT INTO hreviews(user_id,hospital_id,review,rating) VALUES ($1,$2,$3,$4) RETURNING id,review,rating",
      [userId, hospitalId, reviewVal, newRating]
    );
    console.log("TWO");
    console.log(total);
    console.log("TWO");
    let allRatings = await db.query(
      "SELECT hreviews.rating FROM hreviews WHERE hreviews.hospital_id = $1",
      [hospitalId]
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

    await db.query(`UPDATE hospitals SET rating = $1 WHERE hospitals.id = $2`, [
      r,
      hospitalId,
    ]);
    console.log(total);
    console.log(r);
    return newRate.rows;
  }
  static async getRatings(id) {
    try {
      let allRatings = await db.query(
        "SELECT hreviews.rating FROM hreviews WHERE hreviews.hospital_id=$1",
        [id]
      );
      let totalRating = await db.query(
        "SELECT rating FROM hospitals WHERE hospitals.id=$1",
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
module.exports = Hospital;
