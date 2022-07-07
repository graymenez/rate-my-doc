const db = require("../db");

class Gallery {
  static async getAllImages(user_id) {
    const results = await db.query(
      `SELECT image_url FROM gallery WHERE user_id = $1`,
      [user_id]
    );
    return results;
  }
  static async updateProfilePicture(user_id, image_url) {
    await db.query(`UPDATE users SET image_url=$1 WHERE id = $2`, [
      image_url,
      user_id,
    ]);
  }
}
module.exports = Gallery;
