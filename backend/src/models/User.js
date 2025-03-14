const db = require("../config/db");

// Crear la tabla de usuarios
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`
);

// Función para registrar un usuario
const register = (username, email, password, callback) => {
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.run(query, [username, email, password], callback);
};

// Función para buscar un usuario por correo electrónico
const findByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], callback);
};

module.exports = { register, findByEmail };
