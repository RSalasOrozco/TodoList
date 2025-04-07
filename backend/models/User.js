const db = require("../db");

class User {
  static findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  }

  static create(name, email, password) {
    const result = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, password);
    return result.lastInsertRowid;
  }

  static findById(id) {
    return db
      .prepare("SELECT id, name, email, createdAt FROM users WHERE id = ?")
      .get(id);
  }
}

module.exports = User;
