const db = require("../config/db");

// Crear la tabla de usuarios
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`
);

// Funcion para registrar un usuario en la base de datos
const register = (username, password, callback) => {
  const query = "INSERT INTO users (username, password) VALUES (?,?)";
  db.run(query, [username, password], callback);
};

// Funcion para buscar un usuario en la base de datos
const findByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], callback);
};

module.exports = { register, findByUsername };
