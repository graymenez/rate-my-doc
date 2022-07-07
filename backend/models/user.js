const db = require("../db");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");

class User {
  static async register(username, password, email) {
    if (!username || !password) {
      throw new BadRequestError("Username and password required");
    }
    if (!email) {
      throw new BadRequestError("Email required");
    }
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE users.username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Username already exists");
    }
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    let res = await db.query(
      `INSERT INTO users (username,password,email) VALUES ($1,$2,$3) RETURNING id,username,isAdmin`,
      [username, hashedPassword, email]
    );
    const token = jwt.sign(
      { username: username, isAdmin: res.isAdmin },
      SECRET_KEY
    );
    return { loggedInUser: res.rows[0].id, token };
  }

  static async authenticate(username, password) {
    if (!username || !password) {
      throw new BadRequestError("Username and password required");
    }
    const results = await db.query(
      `SELECT id,username,password,isadmin FROM users WHERE users.username = $1`,
      [username]
    );
    const user = results.rows[0];
    if (user) {
      const authUser = await bcrypt.compare(password, user.password);
      console.log(authUser);
      if (authUser) {
        const token = jwt.sign(
          {
            username: user.username,
            isAdmin: user.isadmin,
            timeStamp: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          },
          SECRET_KEY
        );
        return { loggedInUser: user.id, token };
      }
      throw new BadRequestError("Username/password incorrect");
    }
    throw new NotFoundError(`We are not finding a user with those credentials`);
  }

  static async updateUser(
    id,
    first_name = null,
    last_name = null,
    image_url = null,
    password = null
  ) {
    if (!first_name && !last_name && !password && !image_url) {
      throw new BadRequestError("No data recieved");
    }
    if (first_name !== null && last_name !== null && password !== null) {
      await db.query(
        `UPDATE users SET first_name=$1, last_name=$2,password=$3 WHERE id = $4`,
        [first_name, last_name, password, id]
      );
    }
    if (first_name !== null && last_name !== null) {
      await db.query(
        `UPDATE users SET first_name=$1, last_name=$2 WHERE id = $3`,
        [first_name, last_name, id]
      );
    }
    if (first_name !== null) {
      await db.query(`UPDATE users SET first_name=$1 WHERE id = $2`, [
        first_name,
        id,
      ]);
      return { success: true, transaction: "first_name" };
    }
    if (last_name !== null) {
      await db.query(`UPDATE users SET last_name=$1 WHERE id = $2`, [
        last_name,
        id,
      ]);
      return { success: true, transaction: "last_name" };
    }
    if (password !== null) {
      let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
      await db.query(`UPDATE users SET password=$1 WHERE id = $2`, [
        hashedPassword,
        id,
      ]);
      return { success: true, transaction: "password" };
    }
    if (image_url !== null) {
      await db.query(`UPDATE users SET image_url=$1 WHERE id = $2`, [
        image_url,
        id,
      ]);
      return { success: true, transaction: "image" };
    }
    return { success: false, transaction: null };
  }

  static async getUserById(id) {
    const user = await db.query(
      `SELECT username,email,first_name,last_name,image_url FROM users WHERE users.id = $1`,
      [id]
    );
    return user;
  }
  static async addToGallery(id, image_url) {
    await db.query(`INSERT INTO gallery (user_id,image_url) VALUES ($1,$2)`, [
      id,
      image_url,
    ]);
  }
}

module.exports = User;
