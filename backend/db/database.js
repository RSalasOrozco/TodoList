const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta a la base de datos (se creará automáticamente si no existe)
const dbPath = path.resolve(__dirname, "todo_app.db");

// Conexión a SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar a SQLite:", err.message);
  } else {
    console.log("Conectado a SQLite");
    createTables(); // Crear tablas al iniciar
  }
});

// Crear tabla de usuarios si no existe
function createTables() {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) {
        console.error("Error al crear tabla users:", err.message);
      }
    }
  );
}

module.exports = db;
