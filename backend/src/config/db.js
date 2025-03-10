const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta al archivo de la base de datos
const dbPath = path.resolve(__dirname, "../../todo-list.db");

// Conectar a la base de datos (o crearla si no existe)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

module.exports = db;
