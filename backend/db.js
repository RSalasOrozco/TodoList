const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve("auth.db"), {
  verbose: console.log // Opcional: muestra queries en consola
});

// Crear tabla de usuarios
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;
